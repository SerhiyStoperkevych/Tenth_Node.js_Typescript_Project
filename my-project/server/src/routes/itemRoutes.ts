import { Router } from 'express';
import { getItem, updateItem } from '../controllers/itemController';

const router = Router();

router.get('/', getItem);
router.patch('/:id', updateItem);

export default router;
