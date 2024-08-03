import { Router } from 'express';
import { getMessages, postMessage, deleteMessage, updateMessage } from '../controllers/messageController';

const router = Router();

router.get('/messages', getMessages);
router.post('/messages', postMessage);
router.delete('/messages/:id', deleteMessage);
router.put('/messages/:id', updateMessage);

export default router;
