import express from 'express';
import cors from 'cors';

import { getGrades,
         getGradesByName,
         getGradesById,
         getGradesBySubject,
         getGradesByType,
         postGrade,
         patchGradeById,
         putGradeById,
         deleteGrade
} from '../controllers/gradeController.js'

const routes = express();

routes.use(express.json());
routes.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    routes.use(cors());
    next();
});

routes.get('/', getGrades);
routes.get('/name/:name', getGradesByName);
routes.get('/:id', getGradesById);
routes.get('/subject/:subject', getGradesBySubject);
routes.get('/type/:type', getGradesByType);

routes.post('/', postGrade);

routes.patch('/', patchGradeById);

routes.put('/:id', putGradeById);

routes.delete('/:id', deleteGrade);

export default routes;



