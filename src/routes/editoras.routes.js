import { Router } from 'express';
import { EditorasController } from '#controllers/editoras.controller.js';
import db from '#db/singleton-connection.js';
const router = Router();

const editorasController = new EditorasController(db);

router.get('/editoras', editorasController.listarEditoras);
router.get('/editoras/:id', editorasController.buscarEditoraPorId);
router.post('/editoras', editorasController.cadastrarEditora);

export default router;
