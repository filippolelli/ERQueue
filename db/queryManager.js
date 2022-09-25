var pool = require('./db-pool').getPool();


class QueryManager {
    
    async qetQueue(id){
        try{
            const client = await pool.connect();
            var result= await client.query("SELECT codiceemergenza,orarioarrivo from pazienti where id=$1", [id]);
            if (result.rowCount == 0) {
                throw createError(404,"Paziente non esistente, per favore accedere alla coda tramite il link fornito dal qrcode");
            }
            const codice = result.rows[0].codiceemergenza;
            const orario = result.rows[0].orarioarrivo;
            result = await client.query("SELECT COUNT(id) as pazientidavanti FROM pazienti where codiceemergenza>$1 OR (codiceemergenza=$1 AND orarioarrivo<$2)", [codice,orario]);
            client.release();
        }catch(error){
            next(error);
        }
        return result;
    }

    async registerPatient(datas){
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            await client.query('INSERT INTO PAZIENTI(nome,cognome,codicefiscale,sintomi,codiceEmergenza,orarioarrivo) VALUES($1,$2,$3,$4,$5,(FLOOR(EXTRACT(epoch FROM NOW())*1000)))',[datas.nome,datas.cognome,datas.codicefiscale,datas.sintomi,datas.codiceVal]);
            var result=await client.query('SELECT id FROM PAZIENTI WHERE codicefiscale=$1',[datas.codicefiscale]);
            await client.query('COMMIT');
            return result;
        }
        catch (e){
            await client.query('ROLLBACK');
            console.log(e);
            throw(e); 
        }
        finally{
            client.release();
        }
        

    }


    async getPatients(){
        
        const client = await pool.connect();
        var result = await client.query('SELECT nome,cognome,codicefiscale,codiceemergenza,orarioarrivo FROM pazienti ORDER BY codiceemergenza DESC,orarioarrivo')
        client.release();
        return result;

    }

    async deletePatient(codice){
        const client = await pool.connect();
        var result = await client.query('DELETE FROM pazienti WHERE codicefiscale=$1',[codice]);
        client.release();
       return result.rowCount;
    }


}

module.exports = QueryManager;