const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

router.get('/', (req, res, next) => {
    // res.status(200).send({
    //     mensagem: 'Usando GET, puxar todas as informações'
    // });
    mysql.getConnection((error, connection) => {
        if(error) {return res.status(500).send({error: error})};
        connection.query(
            'SELECT * FROM caminhoes;',
            (error, result, field) => {
                if(error) {return res.status(500).send({error: error})};
                return res.status(200).send({response: result});
            }
        )
    });
});

router.post('/', (req, res, next) => {
    // const caminhao = {
    //     nome: req.body.nome,
    //     tamanho: req.body.tamanho,
    //     observacao: req.body.observacao
    // };
    mysql.getConnection((error, connection) => {
        if(error) {return res.status(500).send({error: error})};
        connection.query(
            'INSERT INTO caminhoes (nome, tamanho, observacao) VALUES (?,?,?)',
            [req.body.nome, req.body.tamanho, req.body.observacao],
            (error, result, field) => {
                connection.release();
                if(error) {return res.status(500).send({error: error})};

                res.status(201).send({
                    mensagem: 'Dados do caminhão inserindo com sucesso!',
                    id_caminhao: result.insertId
                });
            }
        )
    });
    
});

router.get('/:id', (req, res, next) => {
    mysql.getConnection((error, connection) => {
        if(error) {return res.status(500).send({error: error})};
        connection.query(
            'SELECT * FROM caminhoes WHERE id = ?;',
            [req.params.id],
            (error, result, field) => {
                if(error) {return res.status(500).send({error: error})};
                return res.status(200).send({response: result});
            }
        )
    
    });
});   


router.patch('/', (req, res, next) => {
    mysql.getConnection((error, connection) => {
        if(error) {return res.status(500).send({error: error})};
        connection.query(
            `UPDATE caminhoes
                SET nome        = ?,
                    tamanho     = ?,
                    observacao  = ?
                WHERE id        = ?`,
                    
            [
                req.body.nome, 
                req.body.tamanho, 
                req.body.observacao,
                req.body.id
            ],
            (error, result, field) => {
                connection.release();
                if(error) {return res.status(500).send({error: error})};

                res.status(202).send({
                    mensagem: 'Dados do caminhão alterado com sucesso!',
                    id_caminhao: result.insertId
                });
            }
        )
    });
});


router.delete('/', (req, res, next) => {
    mysql.getConnection((error, connection) => {
        if(error) {return res.status(500).send({error: error})};
        connection.query(
            `DELETE FROM caminhoes WHERE id = ?`,[ req.body.id],
            (error, result, field) => {
                connection.release();
                if(error) {return res.status(500).send({error: error})};

                res.status(202).send({
                    mensagem: 'Dados do caminhão excluido com sucesso!',
                    id_caminhao: result.insertId
                });
            }
        )
    });
});

module.exports = router;