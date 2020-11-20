import mongoose from 'mongoose';
import Grade from './grade.schema.js';

const db = {};
db.mongoose = mongoose;
//db.url = process.env.MONGODB;
db.url = 'mongodb+srv://ubuntu:chichas@clusteromia.odhmh.mongodb.net/omia';
db.grades = Grade;

export { db };

