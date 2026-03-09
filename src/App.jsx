// --version98
import { useState, useEffect, useRef } from "react";


const BUILD_TIME="2026-03-09T17:34:43Z";

// ── Calendar data (embedded from Excel) ───────────────────────
const CAL_DATA=[{"date":"2026-01-29","semana":"SEMANA 1","dia":"LUNES","mes":"ENERO","IVAN":"P","MAR":"TT (17H.)","SHANE":"TT","PABLO":"P","PAU":"TT"},{"date":"2026-01-30","semana":"SEMANA 1","dia":"MARTES","mes":"ENERO","IVAN":"V","MAR":"P","SHANE":"P","PABLO":"P","PAU":"PARTIDO."},{"date":"2026-01-31","semana":"SEMANA 1","dia":"MIÉRCOLES","mes":"ENERO","IVAN":"TT","MAR":"TT","SHANE":"PD","PABLO":"TT","PAU":"P"},{"date":"2026-01-01","semana":"SEMANA 1","dia":"JUEVES","mes":"ENERO","IVAN":"F","MAR":"F","SHANE":"F","PABLO":"F","PAU":"F"},{"date":"2026-01-02","semana":"SEMANA 1","dia":"VIERNES","mes":"ENERO","IVAN":"TT","MAR":"V","SHANE":"P","PABLO":"V","PAU":"V"},{"date":"2026-01-05","semana":"SEMANA 2","dia":"LUNES","mes":"ENERO","IVAN":"P","MAR":"TT (17H.)","SHANE":"P","PABLO":"V","PAU":"TT"},{"date":"2026-01-06","semana":"SEMANA 2","dia":"MARTES","mes":"ENERO","IVAN":"F","MAR":"F","SHANE":"F","PABLO":"F","PAU":"F"},{"date":"2026-01-07","semana":"SEMANA 2","dia":"MIÉRCOLES","mes":"ENERO","IVAN":"PARTIDO.","MAR":"PARTIDO.","SHANE":"TT","PABLO":"P","PAU":"V"},{"date":"2026-01-08","semana":"SEMANA 2","dia":"JUEVES","mes":"ENERO","IVAN":"P","MAR":"TT (17H.)","SHANE":"PARTIDO.","PABLO":"TT","PAU":"V"},{"date":"2026-01-09","semana":"SEMANA 2","dia":"VIERNES","mes":"ENERO","IVAN":"TT","MAR":"P","SHANE":"TT","PABLO":"P","PAU":"V"},{"date":"2026-01-12","semana":"SEMANA 3","dia":"LUNES","mes":"ENERO","IVAN":"P","MAR":"TT (17H.)","SHANE":"P","PABLO":"PARTIDO.","PAU":"TT"},{"date":"2026-01-13","semana":"SEMANA 3","dia":"MARTES","mes":"ENERO","IVAN":"P","MAR":"PARTIDO.","SHANE":"P","PABLO":"TT","PAU":"PARTIDO."},{"date":"2026-01-14","semana":"SEMANA 3","dia":"MIÉRCOLES","mes":"ENERO","IVAN":"PARTIDO.","MAR":"V","SHANE":"P","PABLO":"P","PAU":"P"},{"date":"2026-01-15","semana":"SEMANA 3","dia":"JUEVES","mes":"ENERO","IVAN":"P","MAR":"PARTIDO.","SHANE":"PARTIDO.","PABLO":"TT","PAU":"P"},{"date":"2026-01-16","semana":"SEMANA 3","dia":"VIERNES","mes":"ENERO","IVAN":"TT","MAR":"P","SHANE":"TT","PABLO":"P","PAU":"TT"},{"date":"2026-01-19","semana":"SEMANA 4","dia":"LUNES","mes":"ENERO","IVAN":"P","MAR":"TT (17H.)","SHANE":"P","PABLO":"PARTIDO.","PAU":"TT"},{"date":"2026-01-20","semana":"SEMANA 4","dia":"MARTES","mes":"ENERO","IVAN":"TT","MAR":"PARTIDO.","SHANE":"TT","PABLO":"P","PAU":"PARTIDO."},{"date":"2026-01-21","semana":"SEMANA 4","dia":"MIÉRCOLES","mes":"ENERO","IVAN":"PARTIDO.","MAR":"PARTIDO.","SHANE":"V","PABLO":"TT","PAU":"P"},{"date":"2026-01-22","semana":"SEMANA 4","dia":"JUEVES","mes":"ENERO","IVAN":"P","MAR":"TT (17H.)","SHANE":"V","PABLO":"P","PAU":"P"},{"date":"2026-01-23","semana":"SEMANA 4","dia":"VIERNES","mes":"ENERO","IVAN":"TT","MAR":"P","SHANE":"TT","PABLO":"P","PAU":"V"},{"date":"2026-01-26","semana":"SEMANA 5","dia":"LUNES","mes":"ENERO","IVAN":"P","MAR":"TT (17H.)","SHANE":"P","PABLO":"PARTIDO.","PAU":"TT"},{"date":"2026-01-27","semana":"SEMANA 5","dia":"MARTES","mes":"ENERO","IVAN":"TT","MAR":"PARTIDO.","SHANE":"P","PABLO":"P","PAU":"PARTIDO."},{"date":"2026-01-28","semana":"SEMANA 5","dia":"MIÉRCOLES","mes":"ENERO","IVAN":"PARTIDO.","MAR":"V","SHANE":"TT","PABLO":"TT","PAU":"P"},{"date":"2026-01-29","semana":"SEMANA 5","dia":"JUEVES","mes":"ENERO","IVAN":"P","MAR":"PARTIDO.","SHANE":"PARTIDO.","PABLO":"P","PAU":"P"},{"date":"2026-01-30","semana":"SEMANA 5","dia":"VIERNES","mes":"ENERO","IVAN":"V","MAR":"P","SHANE":"P","PABLO":"P","PAU":"TT"},{"date":"2026-02-02","semana":"SEMANA 6","dia":"LUNES","mes":"FEBRERO","IVAN":"P","MAR":"TT (17H.)","SHANE":"V","PABLO":"PARTIDO.","PAU":"TT"},{"date":"2026-02-03","semana":"SEMANA 6","dia":"MARTES","mes":"FEBRERO","IVAN":"TT","MAR":"PARTIDO.","SHANE":"TT","PABLO":"P","PAU":"PARTIDO."},{"date":"2026-02-04","semana":"SEMANA 6","dia":"MIÉRCOLES","mes":"FEBRERO","IVAN":"PARTIDO.","MAR":"PARTIDO.","SHANE":"P","PABLO":"P","PAU":"P"},{"date":"2026-02-05","semana":"SEMANA 6","dia":"JUEVES","mes":"FEBRERO","IVAN":"P","MAR":"TT (17H.)","SHANE":"PARTIDO.","PABLO":"P","PAU":"P"},{"date":"2026-02-06","semana":"SEMANA 6","dia":"VIERNES","mes":"FEBRERO","IVAN":"TT","MAR":"P","SHANE":"P","PABLO":"P","PAU":"V"},{"date":"2026-02-09","semana":"SEMANA 7","dia":"LUNES","mes":"FEBRERO","IVAN":"TT","MAR":"TT (17H.)","SHANE":"PD","PABLO":"PARTIDO.","PAU":"TT"},{"date":"2026-02-10","semana":"SEMANA 7","dia":"MARTES","mes":"FEBRERO","IVAN":"P","MAR":"PARTIDO.","SHANE":"P","PABLO":"TT","PAU":"PARTIDO."},{"date":"2026-02-11","semana":"SEMANA 7","dia":"MIÉRCOLES","mes":"FEBRERO","IVAN":"PARTIDO.","MAR":"V","SHANE":"TT","PABLO":"P","PAU":"P"},{"date":"2026-02-12","semana":"SEMANA 7","dia":"JUEVES","mes":"FEBRERO","IVAN":"TT","MAR":"PARTIDO.","SHANE":"TT","PABLO":"TT","PAU":"TT"},{"date":"2026-02-13","semana":"SEMANA 7","dia":"VIERNES","mes":"FEBRERO","IVAN":"P","MAR":"TT","SHANE":"TT","PABLO":"P","PAU":"TT"},{"date":"2026-02-16","semana":"SEMANA 8","dia":"LUNES","mes":"FEBRERO","IVAN":"P","MAR":"TT (17H.)","SHANE":"V","PABLO":"PARTIDO.","PAU":"TT"},{"date":"2026-02-17","semana":"SEMANA 8","dia":"MARTES","mes":"FEBRERO","IVAN":"PARTIDO.","MAR":"PARTIDO.","SHANE":"TT","PABLO":"TT","PAU":"PARTIDO."},{"date":"2026-02-18","semana":"SEMANA 8","dia":"MIÉRCOLES","mes":"FEBRERO","IVAN":"TT","MAR":"P","SHANE":"PARTIDO.","PABLO":"P","PAU":"P"},{"date":"2026-02-19","semana":"SEMANA 8","dia":"JUEVES","mes":"FEBRERO","IVAN":"P","MAR":"TT (17H.)","SHANE":"TT","PABLO":"P","PAU":"P"},{"date":"2026-02-20","semana":"SEMANA 8","dia":"VIERNES","mes":"FEBRERO","IVAN":"TT","MAR":"P","SHANE":"P","PABLO":"P","PAU":"V"},{"date":"2026-02-23","semana":"SEMANA 9","dia":"LUNES","mes":"FEBRERO","IVAN":"P","MAR":"TT (17H.)","SHANE":"V","PABLO":"PARTIDO.","PAU":"TT"},{"date":"2026-02-24","semana":"SEMANA 9","dia":"MARTES","mes":"FEBRERO","IVAN":"P","MAR":"PARTIDO.","SHANE":"V","PABLO":"P","PAU":"PARTIDO."},{"date":"2026-02-25","semana":"SEMANA 9","dia":"MIÉRCOLES","mes":"FEBRERO","IVAN":"PARTIDO.","MAR":"V","SHANE":"P","PABLO":"TT","PAU":"P"},{"date":"2026-02-26","semana":"SEMANA 9","dia":"JUEVES","mes":"FEBRERO","IVAN":"P","MAR":"P","SHANE":"PARTIDO.","PABLO":"PARTIDO.","PAU":"P"},{"date":"2026-02-27","semana":"SEMANA 9","dia":"VIERNES","mes":"FEBRERO","IVAN":"TT","MAR":"P","SHANE":"P","PABLO":"TT","PAU":"TT"},{"date":"2026-03-02","semana":"SEMANA 10","dia":"LUNES","mes":"MARZO","IVAN":"TT","MAR":"PARTIDO.","SHANE":"PARTIDO.","PABLO":"TT","PAU":"PARTIDO."},{"date":"2026-03-03","semana":"SEMANA 10","dia":"MARTES","mes":"MARZO","IVAN":"P","MAR":"PARTIDO.","SHANE":"P","PABLO":"TT","PAU":"P"},{"date":"2026-03-04","semana":"SEMANA 10","dia":"MIÉRCOLES","mes":"MARZO","IVAN":"PARTIDO.","MAR":"V","SHANE":"TT","PABLO":"TT","PAU":"TT"},{"date":"2026-03-05","semana":"SEMANA 10","dia":"JUEVES","mes":"MARZO","IVAN":"P","MAR":"TT (17H.)","SHANE":"PARTIDO.","PABLO":"TT","PAU":"P"},{"date":"2026-03-06","semana":"SEMANA 10","dia":"VIERNES","mes":"MARZO","IVAN":"TT","MAR":"P","SHANE":"TT","PABLO":"P","PAU":"V"},{"date":"2026-03-09","semana":"SEMANA 11","dia":"LUNES","mes":"MARZO","IVAN":"P","MAR":"TT (17H.)","SHANE":"P","PABLO":"PARTIDO.","PAU":"TT"},{"date":"2026-03-10","semana":"SEMANA 11","dia":"MARTES","mes":"MARZO","IVAN":"P","MAR":"PARTIDO.","SHANE":"P","PABLO":"TT","PAU":"PARTIDO."},{"date":"2026-03-11","semana":"SEMANA 11","dia":"MIÉRCOLES","mes":"MARZO","IVAN":"PARTIDO.","MAR":"PARTIDO.","SHANE":"P","PABLO":"P","PAU":"P"},{"date":"2026-03-12","semana":"SEMANA 11","dia":"JUEVES","mes":"MARZO","IVAN":"P","MAR":"TT (17H.)","SHANE":"P","PABLO":"PARTIDO.","PAU":"P"},{"date":"2026-03-13","semana":"SEMANA 11","dia":"VIERNES","mes":"MARZO","IVAN":"TT","MAR":"PARTIDO.","SHANE":"TT","PABLO":"P","PAU":"TT"},{"date":"2026-03-16","semana":"SEMANA 12","dia":"LUNES","mes":"MARZO","IVAN":"P","MAR":"TT (17H.)","SHANE":"P","PABLO":"PARTIDO.","PAU":"TT"},{"date":"2026-03-17","semana":"SEMANA 12","dia":"MARTES","mes":"MARZO","IVAN":"TT","MAR":"PARTIDO.","SHANE":"TT","PABLO":"TT","PAU":"PARTIDO."},{"date":"2026-03-18","semana":"SEMANA 12","dia":"MIÉRCOLES","mes":"MARZO","IVAN":"PARTIDO.","MAR":"V","SHANE":"P","PABLO":"P","PAU":"P"},{"date":"2026-03-19","semana":"SEMANA 12","dia":"JUEVES","mes":"MARZO","IVAN":"P","MAR":"PARTIDO.","SHANE":"PARTIDO.","PABLO":"TT","PAU":"P"},{"date":"2026-03-20","semana":"SEMANA 12","dia":"VIERNES","mes":"MARZO","IVAN":"TT","MAR":"P","SHANE":"TT","PABLO":"P","PAU":"V"},{"date":"2026-03-23","semana":"SEMANA 13","dia":"LUNES","mes":"MARZO","IVAN":"P","MAR":"TT (17H.)","SHANE":"P","PABLO":"PARTIDO.","PAU":"TT"},{"date":"2026-03-24","semana":"SEMANA 13","dia":"MARTES","mes":"MARZO","IVAN":"P","MAR":"PARTIDO.","SHANE":"P","PABLO":"TT","PAU":"PARTIDO."},{"date":"2026-03-25","semana":"SEMANA 13","dia":"MIÉRCOLES","mes":"MARZO","IVAN":"PARTIDO.","MAR":"PARTIDO.","SHANE":"P","PABLO":"P","PAU":"P"},{"date":"2026-03-26","semana":"SEMANA 13","dia":"JUEVES","mes":"MARZO","IVAN":"P","MAR":"TT (17H.)","SHANE":"PARTIDO.","PABLO":"P","PAU":"P"},{"date":"2026-03-27","semana":"SEMANA 13","dia":"VIERNES","mes":"MARZO","IVAN":"TT","MAR":"P","SHANE":"TT","PABLO":"P","PAU":"TT"},{"date":"2026-03-30","semana":"SEMANA 14","dia":"LUNES","mes":"MARZO","IVAN":"P","MAR":"PARTIDO.","SHANE":"P","PABLO":"V","PAU":"TT"},{"date":"2026-03-31","semana":"SEMANA 14","dia":"MARTES","mes":"MARZO","IVAN":"TT","MAR":"PARTIDO.","SHANE":"TT","PABLO":"V","PAU":"PARTIDO."},{"date":"2026-04-01","semana":"SEMANA 14","dia":"MIÉRCOLES","mes":"ABRIL","IVAN":"PARTIDO.","MAR":"TT (17H.)","SHANE":"P","PABLO":"P","PAU":"P"},{"date":"2026-04-02","semana":"SEMANA 14","dia":"JUEVES","mes":"ABRIL","IVAN":"P","MAR":"PARTIDO.","SHANE":"PARTIDO.","PABLO":"TT","PAU":"P"},{"date":"2026-04-03","semana":"SEMANA 14","dia":"VIERNES","mes":"ABRIL","IVAN":"F","MAR":"F","SHANE":"F","PABLO":"F","PAU":"F"},{"date":"2026-04-06","semana":"SEMANA 15","dia":"LUNES","mes":"ABRIL","IVAN":"F","MAR":"F","SHANE":"F","PABLO":"F","PAU":"F"},{"date":"2026-04-07","semana":"SEMANA 15","dia":"MARTES","mes":"ABRIL","IVAN":"P","MAR":"PARTIDO.","SHANE":"P","PABLO":"TT","PAU":"PARTIDO."},{"date":"2026-04-08","semana":"SEMANA 15","dia":"MIÉRCOLES","mes":"ABRIL","IVAN":"PARTIDO.","MAR":"PARTIDO.","SHANE":"P","PABLO":"P","PAU":"P"},{"date":"2026-04-09","semana":"SEMANA 15","dia":"JUEVES","mes":"ABRIL","IVAN":"P","MAR":"TT (17H.)","SHANE":"PARTIDO.","PABLO":"P","PAU":"P"},{"date":"2026-04-10","semana":"SEMANA 15","dia":"VIERNES","mes":"ABRIL","IVAN":"TT","MAR":"P","SHANE":"TT","PABLO":"P","PAU":"TT"},{"date":"2026-04-13","semana":"SEMANA 16","dia":"LUNES","mes":"ABRIL","IVAN":"P","MAR":"PARTIDO.","SHANE":"P","PABLO":"PARTIDO.","PAU":"TT"},{"date":"2026-04-14","semana":"SEMANA 16","dia":"MARTES","mes":"ABRIL","IVAN":"TT","MAR":"PARTIDO.","SHANE":"TT","PABLO":"TT","PAU":"PARTIDO."},{"date":"2026-04-15","semana":"SEMANA 16","dia":"MIÉRCOLES","mes":"ABRIL","IVAN":"PARTIDO.","MAR":"PARTIDO.","SHANE":"P","PABLO":"P","PAU":"P"},{"date":"2026-04-16","semana":"SEMANA 16","dia":"JUEVES","mes":"ABRIL","IVAN":"P","MAR":"TT (17H.)","SHANE":"PARTIDO.","PABLO":"TT","PAU":"P"},{"date":"2026-04-17","semana":"SEMANA 16","dia":"VIERNES","mes":"ABRIL","IVAN":"TT","MAR":"P","SHANE":"TT","PABLO":"P","PAU":"P"},{"date":"2026-04-20","semana":"SEMANA 17","dia":"LUNES","mes":"ABRIL","IVAN":"P","MAR":"TT (17H.)","SHANE":"P","PABLO":"PARTIDO.","PAU":"TT"},{"date":"2026-04-21","semana":"SEMANA 17","dia":"MARTES","mes":"ABRIL","IVAN":"P","MAR":"PARTIDO.","SHANE":"P","PABLO":"TT","PAU":"PARTIDO."},{"date":"2026-04-22","semana":"SEMANA 17","dia":"MIÉRCOLES","mes":"ABRIL","IVAN":"PARTIDO.","MAR":"PARTIDO.","SHANE":"P","PABLO":"P","PAU":"P"},{"date":"2026-04-23","semana":"SEMANA 17","dia":"JUEVES","mes":"ABRIL","IVAN":"P","MAR":"TT (17H.)","SHANE":"PARTIDO.","PABLO":"P","PAU":"P"},{"date":"2026-04-24","semana":"SEMANA 17","dia":"VIERNES","mes":"ABRIL","IVAN":"TT","MAR":"P","SHANE":"TT","PABLO":"P","PAU":"TT"},{"date":"2026-04-27","semana":"SEMANA 18","dia":"LUNES","mes":"ABRIL","IVAN":"P","MAR":"PARTIDO.","SHANE":"P","PABLO":"PARTIDO.","PAU":"TT"},{"date":"2026-04-28","semana":"SEMANA 18","dia":"MARTES","mes":"ABRIL","IVAN":"TT","MAR":"PARTIDO.","SHANE":"TT","PABLO":"TT","PAU":"PARTIDO."},{"date":"2026-04-29","semana":"SEMANA 18","dia":"MIÉRCOLES","mes":"ABRIL","IVAN":"PARTIDO.","MAR":"PARTIDO.","SHANE":"P","PABLO":"P","PAU":"P"},{"date":"2026-04-30","semana":"SEMANA 18","dia":"JUEVES","mes":"ABRIL","IVAN":"P","MAR":"TT (17H.)","SHANE":"PARTIDO.","PABLO":"TT","PAU":"P"},{"date":"2026-05-01","semana":"SEMANA 18","dia":"VIERNES","mes":"MAYO","IVAN":"F","MAR":"F","SHANE":"F","PABLO":"F","PAU":"F"},{"date":"2026-05-04","semana":"SEMANA 19","dia":"LUNES","mes":"MAYO","IVAN":"P","MAR":"TT (17H.)","SHANE":"P","PABLO":"PARTIDO.","PAU":"TT"},{"date":"2026-05-05","semana":"SEMANA 19","dia":"MARTES","mes":"MAYO","IVAN":"P","MAR":"PARTIDO.","SHANE":"P","PABLO":"TT","PAU":"PARTIDO."},{"date":"2026-05-06","semana":"SEMANA 19","dia":"MIÉRCOLES","mes":"MAYO","IVAN":"PARTIDO.","MAR":"PARTIDO.","SHANE":"P","PABLO":"P","PAU":"P"},{"date":"2026-05-07","semana":"SEMANA 19","dia":"JUEVES","mes":"MAYO","IVAN":"P","MAR":"TT (17H.)","SHANE":"PARTIDO.","PABLO":"P","PAU":"P"},{"date":"2026-05-08","semana":"SEMANA 19","dia":"VIERNES","mes":"MAYO","IVAN":"TT","MAR":"P","SHANE":"TT","PABLO":"P","PAU":"TT"},{"date":"2026-05-11","semana":"SEMANA 20","dia":"LUNES","mes":"MAYO","IVAN":"P","MAR":"PARTIDO.","SHANE":"P","PABLO":"PARTIDO.","PAU":"TT"},{"date":"2026-05-12","semana":"SEMANA 20","dia":"MARTES","mes":"MAYO","IVAN":"TT","MAR":"PARTIDO.","SHANE":"TT","PABLO":"TT","PAU":"PARTIDO."},{"date":"2026-05-13","semana":"SEMANA 20","dia":"MIÉRCOLES","mes":"MAYO","IVAN":"PARTIDO.","MAR":"PARTIDO.","SHANE":"P","PABLO":"P","PAU":"P"},{"date":"2026-05-14","semana":"SEMANA 20","dia":"JUEVES","mes":"MAYO","IVAN":"P","MAR":"TT (17H.)","SHANE":"PARTIDO.","PABLO":"TT","PAU":"P"},{"date":"2026-05-15","semana":"SEMANA 20","dia":"VIERNES","mes":"MAYO","IVAN":"TT","MAR":"P","SHANE":"TT","PABLO":"V","PAU":"P"},{"date":"2026-05-18","semana":"SEMANA 21","dia":"LUNES","mes":"MAYO","IVAN":"P","MAR":"TT (17H.)","SHANE":"P","PABLO":"V","PAU":"TT"},{"date":"2026-05-19","semana":"SEMANA 21","dia":"MARTES","mes":"MAYO","IVAN":"P","MAR":"PARTIDO.","SHANE":"P","PABLO":"V","PAU":"PARTIDO."},{"date":"2026-05-20","semana":"SEMANA 21","dia":"MIÉRCOLES","mes":"MAYO","IVAN":"PARTIDO.","MAR":"PARTIDO.","SHANE":"P","PABLO":"V","PAU":"P"},{"date":"2026-05-21","semana":"SEMANA 21","dia":"JUEVES","mes":"MAYO","IVAN":"P","MAR":"TT (17H.)","SHANE":"PARTIDO.","PABLO":"P","PAU":"P"},{"date":"2026-05-22","semana":"SEMANA 21","dia":"VIERNES","mes":"MAYO","IVAN":"TT","MAR":"P","SHANE":"TT","PABLO":"P","PAU":"TT"},{"date":"2026-05-25","semana":"SEMANA 22","dia":"LUNES","mes":"MAYO","IVAN":"F","MAR":"F","SHANE":"F","PABLO":"F","PAU":"F"},{"date":"2026-05-26","semana":"SEMANA 22","dia":"MARTES","mes":"MAYO","IVAN":"TT","MAR":"PARTIDO.","SHANE":"TT","PABLO":"TT","PAU":"PARTIDO."},{"date":"2026-05-27","semana":"SEMANA 22","dia":"MIÉRCOLES","mes":"MAYO","IVAN":"PARTIDO.","MAR":"PARTIDO.","SHANE":"P","PABLO":"P","PAU":"P"},{"date":"2026-05-28","semana":"SEMANA 22","dia":"JUEVES","mes":"MAYO","IVAN":"P","MAR":"TT (17H.)","SHANE":"PARTIDO.","PABLO":"TT","PAU":"P"},{"date":"2026-05-29","semana":"SEMANA 22","dia":"VIERNES","mes":"MAYO","IVAN":"V","MAR":"P","SHANE":"TT","PABLO":"P","PAU":"P"},{"date":"2026-06-01","semana":"SEMANA 23","dia":"LUNES","mes":"JUNIO","IVAN":"V","MAR":"TT (17H.)","SHANE":"P","PABLO":"PARTIDO.","PAU":"TT"},{"date":"2026-06-02","semana":"SEMANA 23","dia":"MARTES","mes":"JUNIO","IVAN":"V","MAR":"PARTIDO.","SHANE":"P","PABLO":"TT","PAU":"PARTIDO."},{"date":"2026-06-03","semana":"SEMANA 23","dia":"MIÉRCOLES","mes":"JUNIO","IVAN":"V","MAR":"PARTIDO.","SHANE":"P","PABLO":"P","PAU":"P"},{"date":"2026-06-04","semana":"SEMANA 23","dia":"JUEVES","mes":"JUNIO","IVAN":"V","MAR":"TT (17H.)","SHANE":"PARTIDO.","PABLO":"P","PAU":"P"},{"date":"2026-06-05","semana":"SEMANA 23","dia":"VIERNES","mes":"JUNIO","IVAN":"V","MAR":"P","SHANE":"TT","PABLO":"P","PAU":"TT"},{"date":"2026-06-08","semana":"SEMANA 24","dia":"LUNES","mes":"JUNIO","IVAN":"V","MAR":"PARTIDO.","SHANE":"P","PABLO":"PARTIDO.","PAU":"TT"},{"date":"2026-06-09","semana":"SEMANA 24","dia":"MARTES","mes":"JUNIO","IVAN":"V","MAR":"PARTIDO.","SHANE":"TT","PABLO":"TT","PAU":"PARTIDO."},{"date":"2026-06-10","semana":"SEMANA 24","dia":"MIÉRCOLES","mes":"JUNIO","IVAN":"V","MAR":"PARTIDO.","SHANE":"P","PABLO":"P","PAU":"P"},{"date":"2026-06-11","semana":"SEMANA 24","dia":"JUEVES","mes":"JUNIO","IVAN":"V","MAR":"TT (17H.)","SHANE":"PARTIDO.","PABLO":"TT","PAU":"P"},{"date":"2026-06-12","semana":"SEMANA 24","dia":"VIERNES","mes":"JUNIO","IVAN":"V","MAR":"P","SHANE":"TT","PABLO":"P","PAU":"P"},{"date":"2026-06-15","semana":"SEMANA 25","dia":"LUNES","mes":"JUNIO","IVAN":"P","MAR":"TT (17H.)","SHANE":"P","PABLO":"PARTIDO.","PAU":"TT"},{"date":"2026-06-16","semana":"SEMANA 25","dia":"MARTES","mes":"JUNIO","IVAN":"P","MAR":"PARTIDO.","SHANE":"P","PABLO":"TT","PAU":"PARTIDO."},{"date":"2026-06-17","semana":"SEMANA 25","dia":"MIÉRCOLES","mes":"JUNIO","IVAN":"PARTIDO.","MAR":"PARTIDO.","SHANE":"P","PABLO":"P","PAU":"P"},{"date":"2026-06-18","semana":"SEMANA 25","dia":"JUEVES","mes":"JUNIO","IVAN":"P","MAR":"TT (17H.)","SHANE":"PARTIDO.","PABLO":"P","PAU":"P"},{"date":"2026-06-19","semana":"SEMANA 25","dia":"VIERNES","mes":"JUNIO","IVAN":"TT","MAR":"P","SHANE":"TT","PABLO":"P","PAU":"TT"},{"date":"2026-06-22","semana":"SEMANA 26","dia":"LUNES","mes":"JUNIO","IVAN":"P","MAR":"PARTIDO.","SHANE":"P","PABLO":"PARTIDO.","PAU":"TT"},{"date":"2026-06-23","semana":"SEMANA 26","dia":"MARTES","mes":"JUNIO","IVAN":"TT","MAR":"PARTIDO.","SHANE":"TT","PABLO":"TT","PAU":"PARTIDO."},{"date":"2026-06-24","semana":"SEMANA 26","dia":"MIÉRCOLES","mes":"JUNIO","IVAN":"F","MAR":"F","SHANE":"F","PABLO":"F","PAU":"F"},{"date":"2026-06-25","semana":"SEMANA 26","dia":"JUEVES","mes":"JUNIO","IVAN":"P","MAR":"TT (17H.)","SHANE":"PARTIDO.","PABLO":"TT","PAU":"P"},{"date":"2026-06-26","semana":"SEMANA 26","dia":"VIERNES","mes":"JUNIO","IVAN":"TT","MAR":"P","SHANE":"TT","PABLO":"P","PAU":"P"},{"date":"2026-06-29","semana":"SEMANA 27","dia":"LUNES","mes":"JUNIO","IVAN":"P","MAR":"TT (17H.)","SHANE":"P","PABLO":"PARTIDO.","PAU":"TT"},{"date":"2026-06-30","semana":"SEMANA 27","dia":"MARTES","mes":"JUNIO","IVAN":"P","MAR":"PARTIDO.","SHANE":"P","PABLO":"TT","PAU":"PARTIDO."},{"date":"2026-07-01","semana":"SEMANA 27","dia":"MIÉRCOLES","mes":"JULIO","IVAN":"PARTIDO.","MAR":"PARTIDO.","SHANE":"P","PABLO":"P","PAU":"P"},{"date":"2026-07-02","semana":"SEMANA 27","dia":"JUEVES","mes":"JULIO","IVAN":"P","MAR":"TT (17H.)","SHANE":"PARTIDO.","PABLO":"P","PAU":"P"},{"date":"2026-07-03","semana":"SEMANA 27","dia":"VIERNES","mes":"JULIO","IVAN":"TT","MAR":"P","SHANE":"TT","PABLO":"P","PAU":"TT"},{"date":"2026-07-06","semana":"SEMANA 28","dia":"LUNES","mes":"JULIO","IVAN":"P","MAR":"PARTIDO.","SHANE":"P","PABLO":"PARTIDO.","PAU":"TT"},{"date":"2026-07-07","semana":"SEMANA 28","dia":"MARTES","mes":"JULIO","IVAN":"TT","MAR":"PARTIDO.","SHANE":"TT","PABLO":"TT","PAU":"PARTIDO."},{"date":"2026-07-08","semana":"SEMANA 28","dia":"MIÉRCOLES","mes":"JULIO","IVAN":"PARTIDO.","MAR":"PARTIDO.","SHANE":"P","PABLO":"P","PAU":"P"},{"date":"2026-07-09","semana":"SEMANA 28","dia":"JUEVES","mes":"JULIO","IVAN":"P","MAR":"TT (17H.)","SHANE":"PARTIDO.","PABLO":"TT","PAU":"P"},{"date":"2026-07-10","semana":"SEMANA 28","dia":"VIERNES","mes":"JULIO","IVAN":"TT","MAR":"P","SHANE":"TT","PABLO":"P","PAU":"P"},{"date":"2026-07-13","semana":"SEMANA 29","dia":"LUNES","mes":"JULIO","IVAN":"P","MAR":"TT (17H.)","SHANE":"P","PABLO":"PARTIDO.","PAU":"TT"},{"date":"2026-07-14","semana":"SEMANA 29","dia":"MARTES","mes":"JULIO","IVAN":"P","MAR":"PARTIDO.","SHANE":"P","PABLO":"TT","PAU":"PARTIDO."},{"date":"2026-07-15","semana":"SEMANA 29","dia":"MIÉRCOLES","mes":"JULIO","IVAN":"PARTIDO.","MAR":"PARTIDO.","SHANE":"P","PABLO":"P","PAU":"P"},{"date":"2026-07-16","semana":"SEMANA 29","dia":"JUEVES","mes":"JULIO","IVAN":"P","MAR":"TT (17H.)","SHANE":"PARTIDO.","PABLO":"P","PAU":"P"},{"date":"2026-07-17","semana":"SEMANA 29","dia":"VIERNES","mes":"JULIO","IVAN":"TT","MAR":"P","SHANE":"TT","PABLO":"P","PAU":"TT"},{"date":"2026-07-20","semana":"SEMANA 30","dia":"LUNES","mes":"JULIO","IVAN":"P","MAR":"PARTIDO.","SHANE":"P","PABLO":"PARTIDO.","PAU":"TT"},{"date":"2026-07-21","semana":"SEMANA 30","dia":"MARTES","mes":"JULIO","IVAN":"TT","MAR":"PARTIDO.","SHANE":"TT","PABLO":"TT","PAU":"PARTIDO."},{"date":"2026-07-22","semana":"SEMANA 30","dia":"MIÉRCOLES","mes":"JULIO","IVAN":"PARTIDO.","MAR":"PARTIDO.","SHANE":"P","PABLO":"P","PAU":"P"},{"date":"2026-07-23","semana":"SEMANA 30","dia":"JUEVES","mes":"JULIO","IVAN":"P","MAR":"TT (17H.)","SHANE":"PARTIDO.","PABLO":"TT","PAU":"P"},{"date":"2026-07-24","semana":"SEMANA 30","dia":"VIERNES","mes":"JULIO","IVAN":"TT","MAR":"P","SHANE":"TT","PABLO":"P","PAU":"P"},{"date":"2026-07-27","semana":"SEMANA 31","dia":"LUNES","mes":"JULIO","IVAN":"P","MAR":"TT (17H.)","SHANE":"P","PABLO":"V","PAU":"TT"},{"date":"2026-07-28","semana":"SEMANA 31","dia":"MARTES","mes":"JULIO","IVAN":"P","MAR":"PARTIDO.","SHANE":"P","PABLO":"V","PAU":"PARTIDO."},{"date":"2026-07-29","semana":"SEMANA 31","dia":"MIÉRCOLES","mes":"JULIO","IVAN":"PARTIDO.","MAR":"PARTIDO.","SHANE":"P","PABLO":"V","PAU":"P"},{"date":"2026-07-30","semana":"SEMANA 31","dia":"JUEVES","mes":"JULIO","IVAN":"P","MAR":"TT (17H.)","SHANE":"PARTIDO.","PABLO":"V","PAU":"P"},{"date":"2026-07-31","semana":"SEMANA 31","dia":"VIERNES","mes":"JULIO","IVAN":"TT","MAR":"P","SHANE":"TT","PABLO":"V","PAU":"TT"},{"date":"2026-08-03","semana":"SEMANA 32","dia":"LUNES","mes":"AGOSTO","IVAN":"P","MAR":"PARTIDO.","SHANE":"P","PABLO":"V","PAU":"TT"},{"date":"2026-08-04","semana":"SEMANA 32","dia":"MARTES","mes":"AGOSTO","IVAN":"TT","MAR":"PARTIDO.","SHANE":"TT","PABLO":"V","PAU":"PARTIDO."},{"date":"2026-08-05","semana":"SEMANA 32","dia":"MIÉRCOLES","mes":"AGOSTO","IVAN":"PARTIDO.","MAR":"PARTIDO.","SHANE":"P","PABLO":"V","PAU":"P"},{"date":"2026-08-06","semana":"SEMANA 32","dia":"JUEVES","mes":"AGOSTO","IVAN":"P","MAR":"TT (17H.)","SHANE":"PARTIDO.","PABLO":"V","PAU":"P"},{"date":"2026-08-07","semana":"SEMANA 32","dia":"VIERNES","mes":"AGOSTO","IVAN":"TT","MAR":"P","SHANE":"TT","PABLO":"V","PAU":"P"},{"date":"2026-08-10","semana":"SEMANA 33","dia":"LUNES","mes":"AGOSTO","IVAN":"P","MAR":"TT (17H.)","SHANE":"P","PABLO":"V","PAU":"TT"},{"date":"2026-08-11","semana":"SEMANA 33","dia":"MARTES","mes":"AGOSTO","IVAN":"P","MAR":"PARTIDO.","SHANE":"P","PABLO":"V","PAU":"PARTIDO."},{"date":"2026-08-12","semana":"SEMANA 33","dia":"MIÉRCOLES","mes":"AGOSTO","IVAN":"PARTIDO.","MAR":"PARTIDO.","SHANE":"P","PABLO":"V","PAU":"P"},{"date":"2026-08-13","semana":"SEMANA 33","dia":"JUEVES","mes":"AGOSTO","IVAN":"P","MAR":"TT (17H.)","SHANE":"PARTIDO.","PABLO":"V","PAU":"P"},{"date":"2026-08-14","semana":"SEMANA 33","dia":"VIERNES","mes":"AGOSTO","IVAN":"TT","MAR":"P","SHANE":"TT","PABLO":"V","PAU":"TT"},{"date":"2026-08-17","semana":"SEMANA 34","dia":"LUNES","mes":"AGOSTO","IVAN":"P","MAR":"PARTIDO.","SHANE":"P","PABLO":"PARTIDO.","PAU":"TT"},{"date":"2026-08-18","semana":"SEMANA 34","dia":"MARTES","mes":"AGOSTO","IVAN":"TT","MAR":"PARTIDO.","SHANE":"TT","PABLO":"TT","PAU":"PARTIDO."},{"date":"2026-08-19","semana":"SEMANA 34","dia":"MIÉRCOLES","mes":"AGOSTO","IVAN":"PARTIDO.","MAR":"PARTIDO.","SHANE":"P","PABLO":"P","PAU":"P"},{"date":"2026-08-20","semana":"SEMANA 34","dia":"JUEVES","mes":"AGOSTO","IVAN":"P","MAR":"TT (17H.)","SHANE":"PARTIDO.","PABLO":"TT","PAU":"P"},{"date":"2026-08-21","semana":"SEMANA 34","dia":"VIERNES","mes":"AGOSTO","IVAN":"TT","MAR":"P","SHANE":"TT","PABLO":"P","PAU":"P"},{"date":"2026-08-24","semana":"SEMANA 35","dia":"LUNES","mes":"AGOSTO","IVAN":"P","MAR":"TT (17H.)","SHANE":"P","PABLO":"PARTIDO.","PAU":"TT"},{"date":"2026-08-25","semana":"SEMANA 35","dia":"MARTES","mes":"AGOSTO","IVAN":"P","MAR":"PARTIDO.","SHANE":"P","PABLO":"TT","PAU":"PARTIDO."},{"date":"2026-08-26","semana":"SEMANA 35","dia":"MIÉRCOLES","mes":"AGOSTO","IVAN":"PARTIDO.","MAR":"PARTIDO.","SHANE":"P","PABLO":"P","PAU":"P"},{"date":"2026-08-27","semana":"SEMANA 35","dia":"JUEVES","mes":"AGOSTO","IVAN":"P","MAR":"TT (17H.)","SHANE":"PARTIDO.","PABLO":"P","PAU":"P"},{"date":"2026-08-28","semana":"SEMANA 35","dia":"VIERNES","mes":"AGOSTO","IVAN":"TT","MAR":"P","SHANE":"TT","PABLO":"P","PAU":"TT"},{"date":"2026-08-31","semana":"SEMANA 36","dia":"LUNES","mes":"AGOSTO","IVAN":"P","MAR":"PARTIDO.","SHANE":"P","PABLO":"PARTIDO.","PAU":"TT"},{"date":"2026-09-01","semana":"SEMANA 36","dia":"MARTES","mes":"SEPTIEMBRE","IVAN":"TT","MAR":"PARTIDO.","SHANE":"TT","PABLO":"TT","PAU":"PARTIDO."},{"date":"2026-09-02","semana":"SEMANA 36","dia":"MIÉRCOLES","mes":"SEPTIEMBRE","IVAN":"PARTIDO.","MAR":"PARTIDO.","SHANE":"P","PABLO":"P","PAU":"P"},{"date":"2026-09-03","semana":"SEMANA 36","dia":"JUEVES","mes":"SEPTIEMBRE","IVAN":"P","MAR":"TT (17H.)","SHANE":"PARTIDO.","PABLO":"TT","PAU":"P"},{"date":"2026-09-04","semana":"SEMANA 36","dia":"VIERNES","mes":"SEPTIEMBRE","IVAN":"TT","MAR":"P","SHANE":"TT","PABLO":"P","PAU":"P"},{"date":"2026-09-07","semana":"SEMANA 37","dia":"LUNES","mes":"SEPTIEMBRE","IVAN":"P","MAR":"TT (17H.)","SHANE":"P","PABLO":"PARTIDO.","PAU":"TT"},{"date":"2026-09-08","semana":"SEMANA 37","dia":"MARTES","mes":"SEPTIEMBRE","IVAN":"P","MAR":"PARTIDO.","SHANE":"P","PABLO":"TT","PAU":"PARTIDO."},{"date":"2026-09-09","semana":"SEMANA 37","dia":"MIÉRCOLES","mes":"SEPTIEMBRE","IVAN":"PARTIDO.","MAR":"PARTIDO.","SHANE":"P","PABLO":"P","PAU":"P"},{"date":"2026-09-10","semana":"SEMANA 37","dia":"JUEVES","mes":"SEPTIEMBRE","IVAN":"P","MAR":"TT (17H.)","SHANE":"PARTIDO.","PABLO":"P","PAU":"P"},{"date":"2026-09-11","semana":"SEMANA 37","dia":"VIERNES","mes":"SEPTIEMBRE","IVAN":"F","MAR":"F","SHANE":"F","PABLO":"F","PAU":"F"},{"date":"2026-09-14","semana":"SEMANA 38","dia":"LUNES","mes":"SEPTIEMBRE","IVAN":"P","MAR":"PARTIDO.","SHANE":"P","PABLO":"PARTIDO.","PAU":"TT"},{"date":"2026-09-15","semana":"SEMANA 38","dia":"MARTES","mes":"SEPTIEMBRE","IVAN":"TT","MAR":"PARTIDO.","SHANE":"TT","PABLO":"TT","PAU":"PARTIDO."},{"date":"2026-09-16","semana":"SEMANA 38","dia":"MIÉRCOLES","mes":"SEPTIEMBRE","IVAN":"PARTIDO.","MAR":"PARTIDO.","SHANE":"P","PABLO":"P","PAU":"P"},{"date":"2026-09-17","semana":"SEMANA 38","dia":"JUEVES","mes":"SEPTIEMBRE","IVAN":"P","MAR":"TT (17H.)","SHANE":"PARTIDO.","PABLO":"TT","PAU":"P"},{"date":"2026-09-18","semana":"SEMANA 38","dia":"VIERNES","mes":"SEPTIEMBRE","IVAN":"TT","MAR":"P","SHANE":"TT","PABLO":"P","PAU":"P"},{"date":"2026-09-21","semana":"SEMANA 39","dia":"LUNES","mes":"SEPTIEMBRE","IVAN":"P","MAR":"TT (17H.)","SHANE":"P","PABLO":"PARTIDO.","PAU":"TT"},{"date":"2026-09-22","semana":"SEMANA 39","dia":"MARTES","mes":"SEPTIEMBRE","IVAN":"P","MAR":"PARTIDO.","SHANE":"P","PABLO":"TT","PAU":"PARTIDO."},{"date":"2026-09-23","semana":"SEMANA 39","dia":"MIÉRCOLES","mes":"SEPTIEMBRE","IVAN":"PARTIDO.","MAR":"PARTIDO.","SHANE":"P","PABLO":"P","PAU":"P"},{"date":"2026-09-24","semana":"SEMANA 39","dia":"JUEVES","mes":"SEPTIEMBRE","IVAN":"F","MAR":"F","SHANE":"F","PABLO":"F","PAU":"F"},{"date":"2026-09-25","semana":"SEMANA 39","dia":"VIERNES","mes":"SEPTIEMBRE","IVAN":"TT","MAR":"P","SHANE":"TT","PABLO":"P","PAU":"TT"},{"date":"2026-09-28","semana":"SEMANA 40","dia":"LUNES","mes":"SEPTIEMBRE","IVAN":"P","MAR":"PARTIDO.","SHANE":"P","PABLO":"PARTIDO.","PAU":"TT"},{"date":"2026-09-29","semana":"SEMANA 40","dia":"MARTES","mes":"SEPTIEMBRE","IVAN":"TT","MAR":"PARTIDO.","SHANE":"TT","PABLO":"TT","PAU":"PARTIDO."},{"date":"2026-09-30","semana":"SEMANA 40","dia":"MIÉRCOLES","mes":"SEPTIEMBRE","IVAN":"PARTIDO.","MAR":"PARTIDO.","SHANE":"P","PABLO":"P","PAU":"P"},{"date":"2026-10-01","semana":"SEMANA 40","dia":"JUEVES","mes":"OCTUBRE","IVAN":"P","MAR":"TT (17H.)","SHANE":"PARTIDO.","PABLO":"TT","PAU":"P"},{"date":"2026-10-02","semana":"SEMANA 40","dia":"VIERNES","mes":"OCTUBRE","IVAN":"TT","MAR":"P","SHANE":"TT","PABLO":"P","PAU":"P"},{"date":"2026-10-05","semana":"SEMANA 41","dia":"LUNES","mes":"OCTUBRE","IVAN":"P","MAR":"TT (17H.)","SHANE":"P","PABLO":"PARTIDO.","PAU":"TT"},{"date":"2026-10-06","semana":"SEMANA 41","dia":"MARTES","mes":"OCTUBRE","IVAN":"P","MAR":"PARTIDO.","SHANE":"P","PABLO":"TT","PAU":"PARTIDO."},{"date":"2026-10-07","semana":"SEMANA 41","dia":"MIÉRCOLES","mes":"OCTUBRE","IVAN":"PARTIDO.","MAR":"PARTIDO.","SHANE":"P","PABLO":"P","PAU":"P"},{"date":"2026-10-08","semana":"SEMANA 41","dia":"JUEVES","mes":"OCTUBRE","IVAN":"P","MAR":"TT (17H.)","SHANE":"PARTIDO.","PABLO":"P","PAU":"P"},{"date":"2026-10-09","semana":"SEMANA 41","dia":"VIERNES","mes":"OCTUBRE","IVAN":"TT","MAR":"P","SHANE":"TT","PABLO":"P","PAU":"TT"},{"date":"2026-10-12","semana":"SEMANA 42","dia":"LUNES","mes":"OCTUBRE","IVAN":"F","MAR":"F","SHANE":"F","PABLO":"F","PAU":"F"},{"date":"2026-10-13","semana":"SEMANA 42","dia":"MARTES","mes":"OCTUBRE","IVAN":"TT","MAR":"PARTIDO.","SHANE":"TT","PABLO":"TT","PAU":"PARTIDO."},{"date":"2026-10-14","semana":"SEMANA 42","dia":"MIÉRCOLES","mes":"OCTUBRE","IVAN":"PARTIDO.","MAR":"PARTIDO.","SHANE":"P","PABLO":"P","PAU":"P"},{"date":"2026-10-15","semana":"SEMANA 42","dia":"JUEVES","mes":"OCTUBRE","IVAN":"P","MAR":"TT (17H.)","SHANE":"PARTIDO.","PABLO":"TT","PAU":"P"},{"date":"2026-10-16","semana":"SEMANA 42","dia":"VIERNES","mes":"OCTUBRE","IVAN":"TT","MAR":"P","SHANE":"TT","PABLO":"P","PAU":"P"},{"date":"2026-10-19","semana":"SEMANA 43","dia":"LUNES","mes":"OCTUBRE","IVAN":"P","MAR":"TT (17H.)","SHANE":"P","PABLO":"PARTIDO.","PAU":"TT"},{"date":"2026-10-20","semana":"SEMANA 43","dia":"MARTES","mes":"OCTUBRE","IVAN":"P","MAR":"PARTIDO.","SHANE":"P","PABLO":"TT","PAU":"PARTIDO."},{"date":"2026-10-21","semana":"SEMANA 43","dia":"MIÉRCOLES","mes":"OCTUBRE","IVAN":"PARTIDO.","MAR":"PARTIDO.","SHANE":"P","PABLO":"P","PAU":"P"},{"date":"2026-10-22","semana":"SEMANA 43","dia":"JUEVES","mes":"OCTUBRE","IVAN":"P","MAR":"TT (17H.)","SHANE":"PARTIDO.","PABLO":"P","PAU":"P"},{"date":"2026-10-23","semana":"SEMANA 43","dia":"VIERNES","mes":"OCTUBRE","IVAN":"TT","MAR":"P","SHANE":"TT","PABLO":"P","PAU":"TT"},{"date":"2026-10-26","semana":"SEMANA 44","dia":"LUNES","mes":"OCTUBRE","IVAN":"P","MAR":"PARTIDO.","SHANE":"P","PABLO":"PARTIDO.","PAU":"TT"},{"date":"2026-10-27","semana":"SEMANA 44","dia":"MARTES","mes":"OCTUBRE","IVAN":"TT","MAR":"PARTIDO.","SHANE":"TT","PABLO":"TT","PAU":"PARTIDO."},{"date":"2026-10-28","semana":"SEMANA 44","dia":"MIÉRCOLES","mes":"OCTUBRE","IVAN":"PARTIDO.","MAR":"PARTIDO.","SHANE":"P","PABLO":"P","PAU":"P"},{"date":"2026-10-29","semana":"SEMANA 44","dia":"JUEVES","mes":"OCTUBRE","IVAN":"P","MAR":"TT (17H.)","SHANE":"PARTIDO.","PABLO":"TT","PAU":"P"},{"date":"2026-10-30","semana":"SEMANA 44","dia":"VIERNES","mes":"OCTUBRE","IVAN":"TT","MAR":"P","SHANE":"TT","PABLO":"P","PAU":"P"},{"date":"2026-11-02","semana":"SEMANA 45","dia":"LUNES","mes":"NOVIEMBRE","IVAN":"P","MAR":"TT (17H.)","SHANE":"P","PABLO":"PARTIDO.","PAU":"TT"},{"date":"2026-11-03","semana":"SEMANA 45","dia":"MARTES","mes":"NOVIEMBRE","IVAN":"P","MAR":"PARTIDO.","SHANE":"P","PABLO":"TT","PAU":"PARTIDO."},{"date":"2026-11-04","semana":"SEMANA 45","dia":"MIÉRCOLES","mes":"NOVIEMBRE","IVAN":"PARTIDO.","MAR":"PARTIDO.","SHANE":"P","PABLO":"P","PAU":"P"},{"date":"2026-11-05","semana":"SEMANA 45","dia":"JUEVES","mes":"NOVIEMBRE","IVAN":"P","MAR":"TT (17H.)","SHANE":"PARTIDO.","PABLO":"P","PAU":"P"},{"date":"2026-11-06","semana":"SEMANA 45","dia":"VIERNES","mes":"NOVIEMBRE","IVAN":"TT","MAR":"P","SHANE":"TT","PABLO":"P","PAU":"TT"},{"date":"2026-11-09","semana":"SEMANA 46","dia":"LUNES","mes":"NOVIEMBRE","IVAN":"P","MAR":"PARTIDO.","SHANE":"P","PABLO":"PARTIDO.","PAU":"TT"},{"date":"2026-11-10","semana":"SEMANA 46","dia":"MARTES","mes":"NOVIEMBRE","IVAN":"TT","MAR":"PARTIDO.","SHANE":"TT","PABLO":"TT","PAU":"PARTIDO."},{"date":"2026-11-11","semana":"SEMANA 46","dia":"MIÉRCOLES","mes":"NOVIEMBRE","IVAN":"PARTIDO.","MAR":"PARTIDO.","SHANE":"P","PABLO":"P","PAU":"P"},{"date":"2026-11-12","semana":"SEMANA 46","dia":"JUEVES","mes":"NOVIEMBRE","IVAN":"P","MAR":"TT (17H.)","SHANE":"PARTIDO.","PABLO":"TT","PAU":"P"},{"date":"2026-11-13","semana":"SEMANA 46","dia":"VIERNES","mes":"NOVIEMBRE","IVAN":"TT","MAR":"P","SHANE":"TT","PABLO":"P","PAU":"P"},{"date":"2026-11-16","semana":"SEMANA 47","dia":"LUNES","mes":"NOVIEMBRE","IVAN":"P","MAR":"TT (17H.)","SHANE":"P","PABLO":"PARTIDO.","PAU":"TT"},{"date":"2026-11-17","semana":"SEMANA 47","dia":"MARTES","mes":"NOVIEMBRE","IVAN":"P","MAR":"PARTIDO.","SHANE":"P","PABLO":"TT","PAU":"PARTIDO."},{"date":"2026-11-18","semana":"SEMANA 47","dia":"MIÉRCOLES","mes":"NOVIEMBRE","IVAN":"PARTIDO.","MAR":"PARTIDO.","SHANE":"P","PABLO":"P","PAU":"P"},{"date":"2026-11-19","semana":"SEMANA 47","dia":"JUEVES","mes":"NOVIEMBRE","IVAN":"P","MAR":"TT (17H.)","SHANE":"PARTIDO.","PABLO":"P","PAU":"P"},{"date":"2026-11-20","semana":"SEMANA 47","dia":"VIERNES","mes":"NOVIEMBRE","IVAN":"TT","MAR":"P","SHANE":"TT","PABLO":"P","PAU":"TT"},{"date":"2026-11-23","semana":"SEMANA 48","dia":"LUNES","mes":"NOVIEMBRE","IVAN":"P","MAR":"PARTIDO.","SHANE":"P","PABLO":"PARTIDO.","PAU":"TT"},{"date":"2026-11-24","semana":"SEMANA 48","dia":"MARTES","mes":"NOVIEMBRE","IVAN":"TT","MAR":"PARTIDO.","SHANE":"TT","PABLO":"TT","PAU":"PARTIDO."},{"date":"2026-11-25","semana":"SEMANA 48","dia":"MIÉRCOLES","mes":"NOVIEMBRE","IVAN":"PARTIDO.","MAR":"PARTIDO.","SHANE":"P","PABLO":"P","PAU":"P"},{"date":"2026-11-26","semana":"SEMANA 48","dia":"JUEVES","mes":"NOVIEMBRE","IVAN":"P","MAR":"TT (17H.)","SHANE":"PARTIDO.","PABLO":"TT","PAU":"P"},{"date":"2026-11-27","semana":"SEMANA 48","dia":"VIERNES","mes":"NOVIEMBRE","IVAN":"TT","MAR":"P","SHANE":"TT","PABLO":"P","PAU":"P"},{"date":"2026-11-30","semana":"SEMANA 49","dia":"LUNES","mes":"NOVIEMBRE","IVAN":"P","MAR":"TT (17H.)","SHANE":"P","PABLO":"PARTIDO.","PAU":"TT"},{"date":"2026-12-01","semana":"SEMANA 49","dia":"MARTES","mes":"DICIEMBRE","IVAN":"P","MAR":"PARTIDO.","SHANE":"P","PABLO":"TT","PAU":"PARTIDO."},{"date":"2026-12-02","semana":"SEMANA 49","dia":"MIÉRCOLES","mes":"DICIEMBRE","IVAN":"PARTIDO.","MAR":"PARTIDO.","SHANE":"P","PABLO":"P","PAU":"P"},{"date":"2026-12-03","semana":"SEMANA 49","dia":"JUEVES","mes":"DICIEMBRE","IVAN":"P","MAR":"TT (17H.)","SHANE":"PARTIDO.","PABLO":"P","PAU":"P"},{"date":"2026-12-04","semana":"SEMANA 49","dia":"VIERNES","mes":"DICIEMBRE","IVAN":"TT","MAR":"P","SHANE":"TT","PABLO":"P","PAU":"TT"},{"date":"2026-12-07","semana":"SEMANA 50","dia":"LUNES","mes":"DICIEMBRE","IVAN":"P","MAR":"PARTIDO.","SHANE":"P","PABLO":"PARTIDO.","PAU":"TT"},{"date":"2026-12-08","semana":"SEMANA 50","dia":"MARTES","mes":"DICIEMBRE","IVAN":"F","MAR":"F","SHANE":"F","PABLO":"F","PAU":"F"},{"date":"2026-12-09","semana":"SEMANA 50","dia":"MIÉRCOLES","mes":"DICIEMBRE","IVAN":"PARTIDO.","MAR":"PARTIDO.","SHANE":"P","PABLO":"P","PAU":"P"},{"date":"2026-12-10","semana":"SEMANA 50","dia":"JUEVES","mes":"DICIEMBRE","IVAN":"P","MAR":"TT (17H.)","SHANE":"PARTIDO.","PABLO":"TT","PAU":"P"},{"date":"2026-12-11","semana":"SEMANA 50","dia":"VIERNES","mes":"DICIEMBRE","IVAN":"TT","MAR":"P","SHANE":"TT","PABLO":"P","PAU":"P"},{"date":"2026-12-14","semana":"SEMANA 51","dia":"LUNES","mes":"DICIEMBRE","IVAN":"P","MAR":"TT (17H.)","SHANE":"P","PABLO":"PARTIDO.","PAU":"TT"},{"date":"2026-12-15","semana":"SEMANA 51","dia":"MARTES","mes":"DICIEMBRE","IVAN":"P","MAR":"PARTIDO.","SHANE":"P","PABLO":"TT","PAU":"PARTIDO."},{"date":"2026-12-16","semana":"SEMANA 51","dia":"MIÉRCOLES","mes":"DICIEMBRE","IVAN":"PARTIDO.","MAR":"PARTIDO.","SHANE":"P","PABLO":"P","PAU":"P"},{"date":"2026-12-17","semana":"SEMANA 51","dia":"JUEVES","mes":"DICIEMBRE","IVAN":"P","MAR":"TT (17H.)","SHANE":"PARTIDO.","PABLO":"P","PAU":"P"},{"date":"2026-12-18","semana":"SEMANA 51","dia":"VIERNES","mes":"DICIEMBRE","IVAN":"TT","MAR":"P","SHANE":"TT","PABLO":"P","PAU":"TT"},{"date":"2026-12-21","semana":"SEMANA 52","dia":"LUNES","mes":"DICIEMBRE","IVAN":"P","MAR":"PARTIDO.","SHANE":"P","PABLO":"PARTIDO.","PAU":"TT"},{"date":"2026-12-22","semana":"SEMANA 52","dia":"MARTES","mes":"DICIEMBRE","IVAN":"TT","MAR":"PARTIDO.","SHANE":"TT","PABLO":"TT","PAU":"PARTIDO."},{"date":"2026-12-23","semana":"SEMANA 52","dia":"MIÉRCOLES","mes":"DICIEMBRE","IVAN":"PARTIDO.","MAR":"PARTIDO.","SHANE":"P","PABLO":"P","PAU":"P"},{"date":"2026-12-24","semana":"SEMANA 52","dia":"JUEVES","mes":"DICIEMBRE","IVAN":"P","MAR":"TT (17H.)","SHANE":"PARTIDO.","PABLO":"TT","PAU":"P"},{"date":"2026-12-25","semana":"SEMANA 52","dia":"VIERNES","mes":"DICIEMBRE","IVAN":"F","MAR":"F","SHANE":"F","PABLO":"F","PAU":"F"},{"date":"2026-12-28","semana":"SEMANA 53","dia":"LUNES","mes":"DICIEMBRE","IVAN":"P","MAR":"TT (17H.)","SHANE":"P","PABLO":"PARTIDO.","PAU":"TT"},{"date":"2026-12-29","semana":"SEMANA 53","dia":"MARTES","mes":"DICIEMBRE","IVAN":"P","MAR":"PARTIDO.","SHANE":"P","PABLO":"TT","PAU":"PARTIDO."},{"date":"2026-12-30","semana":"SEMANA 53","dia":"MIÉRCOLES","mes":"DICIEMBRE","IVAN":"PARTIDO.","MAR":"PARTIDO.","SHANE":"P","PABLO":"P","PAU":"P"},{"date":"2026-12-31","semana":"SEMANA 53","dia":"JUEVES","mes":"DICIEMBRE","IVAN":"P","MAR":"TT (17H.)","SHANE":"PARTIDO.","PABLO":"P","PAU":"P"},{"date":"2026-01-01","semana":"SEMANA 53","dia":"VIERNES","mes":"ENERO","IVAN":"F","MAR":"F","SHANE":"F","PABLO":"F","PAU":"F"}];

const CAL_MEMBERS=["IVAN","MAR","SHANE","PABLO","PAU"];
const CAL_STATUS={
  P:{label:"Presencial",color:"#6BCB77",bg:"#0F2215",bgL:"#EDFAEF",icon:"🏢"},
  TT:{label:"Teletrabajo",color:"#74B9FF",bg:"#0D1E35",bgL:"#EBF4FF",icon:"🏠"},
  V:{label:"Vacaciones",color:"#FFD93D",bg:"#262010",bgL:"#FFFBE0",icon:"🌴"},
  F:{label:"Festivo",color:"#888",bg:"#1A1A20",bgL:"#F0F0F4",icon:"🎉"},
  PARTIDO:{label:"Partido",color:"#C3A6FF",bg:"#1A1228",bgL:"#F5F0FF",icon:"⚽"},
  PD:{label:"Presencial (D)",color:"#6BCB77",bg:"#0F2215",bgL:"#EDFAEF",icon:"🏢"},
  OTHER:{label:"Otro",color:"#FF9F43",bg:"#251A0D",bgL:"#FFF5E8",icon:"📌"},
};
function getStatus(val){
  if(!val)return CAL_STATUS.OTHER;
  const v=val.toUpperCase().replace(/\s+/g,"").replace(/\./g,"");
  if(v==="P"||v==="PD")return CAL_STATUS[v.startsWith("P")&&v.length<=2?v:"P"];
  if(v.startsWith("TT"))return CAL_STATUS.TT;
  if(v==="V")return CAL_STATUS.V;
  if(v==="F")return CAL_STATUS.F;
  if(v.includes("PARTIDO"))return CAL_STATUS.PARTIDO;
  return CAL_STATUS.OTHER;
}

// ── Theme ──────────────────────────────────────────────────────
const DARK={bg:"#09090E",surface:"#13131C",surface2:"#11111A",sidebar:"#0B0B12",border:"#22222E",border2:"#1A1A24",border3:"#14141C",text:"#EEEEF8",text2:"#D8D8E8",text3:"#888",text4:"#555",text5:"#3A3A4E",text6:"#2E2E3E",inputBg:"#0A0A0F",cardBg:"#11111A",rowBg:"#13131C",rowDone:"#0E0E14",subBg:"#0D0D14",sectionLabel:"#3A3A4E"};
const LIGHT={bg:"#F5F5FA",surface:"#FFFFFF",surface2:"#F8F8FC",sidebar:"#FFFFFF",border:"#E0E0EC",border2:"#EAEAF4",border3:"#EBEBF5",text:"#111118",text2:"#2A2A38",text3:"#666",text4:"#888",text5:"#9999AA",text6:"#BBBBCC",inputBg:"#F8F8FC",cardBg:"#FFFFFF",rowBg:"#FFFFFF",rowDone:"#F2F2F8",subBg:"#F5F5FA",sectionLabel:"#9999AA"};
const COLORS=[
  {bg:"#FF6B6B",lightD:"#2A1515",lightL:"#FFF0F0",accent:"#FF6B6B",text:"#FF9999",textL:"#CC2222"},
  {bg:"#4ECDC4",lightD:"#0F2422",lightL:"#E8FAFA",accent:"#4ECDC4",text:"#7EEEE8",textL:"#1A8A84"},
  {bg:"#FFD93D",lightD:"#262010",lightL:"#FFFBE0",accent:"#FFD93D",text:"#FFE878",textL:"#AA8800"},
  {bg:"#6BCB77",lightD:"#0F2215",lightL:"#EDFAEF",accent:"#6BCB77",text:"#96E09F",textL:"#2A7A34"},
  {bg:"#C3A6FF",lightD:"#1A1228",lightL:"#F5F0FF",accent:"#C3A6FF",text:"#D9C4FF",textL:"#6633CC"},
  {bg:"#FF9F43",lightD:"#251A0D",lightL:"#FFF5E8",accent:"#FF9F43",text:"#FFBE7A",textL:"#CC6600"},
  {bg:"#74B9FF",lightD:"#0D1E35",lightL:"#EBF4FF",accent:"#74B9FF",text:"#A8D4FF",textL:"#1155CC"},
  {bg:"#FD79A8",lightD:"#2A0D1A",lightL:"#FFF0F6",accent:"#FD79A8",text:"#FFB3CE",textL:"#CC1166"},
  {bg:"#55EFC4",lightD:"#0A2218",lightL:"#E0FFF6",accent:"#55EFC4",text:"#7AFFD9",textL:"#1A7A5A"},
];
function gc(c,dark){return{...c,light:dark?c.lightD:c.lightL,tc:dark?c.text:c.textL};}

const PRIORITY={alta:{label:"Alta",cD:"#FF6B6B",bD:"#2A1515",cL:"#CC2222",bL:"#FFF0F0",dot:"🔴"},media:{label:"Media",cD:"#FFD93D",bD:"#262010",cL:"#AA8800",bL:"#FFFBE0",dot:"🟡"},baja:{label:"Baja",cD:"#6BCB77",bD:"#0F2215",cL:"#2A7A34",bL:"#EDFAEF",dot:"🟢"}};
const TASK_KIND={
  tarea:      {label:"Tarea",      icon:"📋", color:"#2E5FA3", bg:"#EEF3FB"},
  reunion:    {label:"Reunión",    icon:"🎙️", color:"#9966FF", bg:"#F3EEFF"},
  reminder:   {label:"Reminder",  icon:"⏰", color:"#FF9F43", bg:"#FFF5E6"},
  seguimiento:{label:"Seguim.",   icon:"🔍", color:"#00B894", bg:"#E8FAF5"},
};
const TASK_STATUS={
  backlog:{label:"Backlog",color:"#8899BB",bg:"#8899BB22",icon:"📋"},
  "en-curso":{label:"En curso",color:"#FF9F43",bg:"#FF9F4322",icon:"⚡"},
  escalado:{label:"Escalado",color:"#9966FF",bg:"#9966FF22",icon:"🔺"},
  bloqueado:{label:"Bloqueado",color:"#FF4444",bg:"#FF444422",icon:"🔒"},
};
function ps(k,active,dark){const p=PRIORITY[k];return{color:active?(dark?p.cD:p.cL):(dark?"#444":"#999"),background:active?(dark?p.bD:p.bL):"transparent",border:`1.5px solid ${active?(dark?p.cD:p.cL):(dark?"#22222E":"#DDD")}`};}

const CHK_STATES=["Pendiente","En curso","Completada","Bloqueada"];
const CHK_STYLE={"Pendiente":{cD:"#FFD93D",bD:"#26200F",cL:"#AA8800",bL:"#FFFBE0",icon:"○"},"En curso":{cD:"#74B9FF",bD:"#0D1835",cL:"#1155CC",bL:"#EBF4FF",icon:"◐"},"Completada":{cD:"#6BCB77",bD:"#0F2215",cL:"#2A7A34",bL:"#EDFAEF",icon:"✓"},"Bloqueada":{cD:"#FD79A8",bD:"#2A0D1A",cL:"#CC1166",bL:"#FFF0F6",icon:"⊘"}};
function cst(s,dark){const c=CHK_STYLE[s]||CHK_STYLE["Pendiente"];return{color:dark?c.cD:c.cL,background:dark?c.bD:c.bL,icon:c.icon};}

const MTG_STATES=["Pendiente","En curso","Completada","Cancelada","Bloqueada"];
const MTG_COLORS={"Pendiente":{cD:"#FFD93D",bD:"#262010",cL:"#AA8800",bL:"#FFFBE0"},"En curso":{cD:"#74B9FF",bD:"#0D1E35",cL:"#1155CC",bL:"#EBF4FF"},"Completada":{cD:"#6BCB77",bD:"#0F2215",cL:"#2A7A34",bL:"#EDFAEF"},"Cancelada":{cD:"#FF6B6B",bD:"#2A1515",cL:"#CC2222",bL:"#FFF0F0"},"Bloqueada":{cD:"#FD79A8",bD:"#2A0D1A",cL:"#CC1166",bL:"#FFF0F6"}};
function msc(s,dark){const c=MTG_COLORS[s]||MTG_COLORS["Pendiente"];return{color:dark?c.cD:c.cL,background:dark?c.bD:c.bL};}

const WEEK_DAYS_ES=["Lunes","Martes","Miércoles","Jueves","Viernes"];
const ICONS=["💼","🏠","🎯","📚","🌱","🛒","🧠","🎨","💡","🔧","⚡","🤝","👥","📊","🗓️","🎙️","🌿","🔑","💎","🚀"];

function genId(){return Math.random().toString(36).substr(2,9);}
function today(){const d=new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");}
function fmt(d){if(!d)return"—";return new Date(d+"T00:00:00").toLocaleDateString("es-ES",{day:"2-digit",month:"short",year:"numeric"});}
function fmtShort(d){if(!d)return"—";return new Date(d+"T00:00:00").toLocaleDateString("es-ES",{day:"2-digit",month:"short"});}
function dlStatus(dl){
  if(!dl)return null;
  const now=new Date();now.setHours(0,0,0,0);
  const d=new Date(dl+"T00:00:00");const diff=Math.round((d-now)/86400000);
  if(diff<0)return{label:"Vencida",color:"#FF6B6B",urgent:true};
  if(diff===0)return{label:"Hoy",color:"#FF9F43",urgent:true};
  if(diff<=3)return{label:`${diff}d`,color:"#FFD93D",urgent:false};
  return{label:`${diff}d`,color:"#6BCB77",urgent:false};
}
function localISO(d){return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");}
function getWeekStart(dateStr){
  const d=new Date(dateStr+"T12:00:00");
  const day=d.getDay();
  const diff=day===0?-6:1-day;
  const mon=new Date(d);mon.setDate(d.getDate()+diff);
  return localISO(mon);
}
function addDays(dateStr,n){
  const d=new Date(dateStr+"T12:00:00");d.setDate(d.getDate()+n);
  return localISO(d);
}

function mkTask(text){return{id:genId(),text,done:false,taskKind:"tarea",priority:"media",status:"backlog",blockReason:"",createdAt:today(),deadline:null,completedAt:null,jiraUrl:"",description:"",recurrence:null,checklist:[],contacts:[],labels:[],owner:""};}
function mkChkItem(text="",collab=""){return{id:genId(),text,state:"Pendiente",deadline:null,collaborator:collab,nextActions:"",owner:""};}
function mkMeeting(inheritItems=[]){
  return{id:genId(),meetingId:`M-${Date.now().toString(36).toUpperCase()}`,date:today(),state:"Pendiente",notes:"",done:false,createdAt:today(),completedAt:null,
    checklist:inheritItems.map(i=>({...mkChkItem(i.text),carriedFrom:true,nextActions:i.nextActions||""}))};
}
function mkTeamMeeting(collaborator="",inheritItems=[]){
  return{id:genId(),meetingId:`E-${Date.now().toString(36).toUpperCase()}`,collaborator,date:today(),state:"Pendiente",notes:"",done:false,createdAt:today(),completedAt:null,
    checklist:inheritItems.map(i=>({...mkChkItem(i.text,collaborator),carriedFrom:true,nextActions:i.nextActions||""}))};
}

const INITIAL=[
  {id:"c1",name:"Estratégica",icon:"🎯",colorIdx:0,type:"tasks",tasks:["Informe mensual","Comité trimestral C-Level","Seguimiento estandarización","LLICÀ: Volumen E2","LLICÀ: Pantallas cota 140","LLICÀ: Mejora gestión expediciones","BD Mango: Integración WCS","BD Mango: Integración Microsoft Lists","BD Mango: Gobernanza datos","Hackathon: 1 tipología pallet","Hackathon: Reducción tipología cajas","Hackathon: Optimización carga camiones"].map(mkTask)},
  {id:"c2",name:"Transversal",icon:"🤝",colorIdx:2,type:"tasks",tasks:["TSA España: Evaluar necesidad 4 salidas semanales"].map(mkTask)},
  {id:"c3",name:"Equipo",icon:"👥",colorIdx:3,type:"tasks",tasks:["1:1 Con manager","1:1 Con subordinados","Objetivos 2026: Definir OKRs","Objetivos 2026: Bajar a épicas","Objetivos 2026: Sprints en Jira","Matriz Polivalencia: Equilibrio skills","Disponibilidad: Oficina / Teletrabajo / Vacaciones","Shane – Automatización agendas","Pablo – Sobrestock 131","Pablo – Cajas cliente 131","Iván – Reservas B2C","Iván – Post-mortem BF25","Pau – Entrega Grafanas"].map(mkTask)},
  {id:"c4",name:"Data & Operación",icon:"⚡",colorIdx:5,type:"tasks",tasks:["Influx + Grafana (real time)","PL/SQL producción","Databricks + Radar (histórico)","Reporting producción no cubierto","Herramientas Python → Entorno IT"].map(mkTask)},
  {id:"c5",name:"Personal",icon:"🌿",colorIdx:8,type:"personal",tasks:[]},
  {id:"c6",name:"121 Manager",icon:"🎙️",colorIdx:6,type:"meeting",tasks:[]},
  {id:"c7",name:"121 Equipo",icon:"🗓️",colorIdx:7,type:"meeting121eq",tasks:[]},
];

// ── Helpers ────────────────────────────────────────────────────
function SL({children,th}){return<div style={{color:th.sectionLabel,fontSize:10,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",marginBottom:7}}>{children}</div>;}
function inp(th,extra={}){return{background:th.inputBg,border:`1px solid ${th.border}`,borderRadius:7,padding:"6px 10px",color:th.text,fontSize:12,outline:"none",...extra};}

// ── CSV Export ─────────────────────────────────────────────────
function downloadCSV(filename,rows){
  const csv=rows.map(r=>r.map(c=>`"${String(c||"").replace(/"/g,'""')}"`).join(",")).join("\n");
  const blob=new Blob(["\uFEFF"+csv],{type:"text/csv;charset=utf-8;"});
  const url=URL.createObjectURL(blob);const a=document.createElement("a");
  a.href=url;a.download=filename;document.body.appendChild(a);a.click();document.body.removeChild(a);URL.revokeObjectURL(url);
}
function exportProjectReport(cats,projects,dark,kpiData={},projFrom='',projTo=''){
  const today_=today();
  // Collect all tasks with their labels
  const allTasks=cats.flatMap(c=>c.tasks
    .filter(t=>c.type!=="meeting"&&c.type!=="meeting121eq"&&c.type!=="personal")
    .map(t=>({...t,catName:c.name,catIcon:c.icon,catType:c.type}))
  );

  const buildKPISection=(proj,kpiData)=>{
    const tables=(kpiData[proj])||[];
    if(!tables||tables.length===0)return "";
    const COLORS=["#2E5FA3","#E07B39","#6BCB77","#9966FF","#FF6B6B"];
    const fmtN=c=>{
      const n=parseFloat(String(c||"").replace(/[.]/g,"").replace(",","."));
      return(!isNaN(n)&&String(c).trim()!=="")?n.toLocaleString("es-ES"):String(c||"");
    };
    const tablesHtml=tables.map(table=>{
      const rows=(table.rows||[]).filter(r=>r&&r[0]);
      if(rows.length===0)return "";
      const graphCols=table.graphCols||[];
      const cols=graphCols.map(ci=>table.columns[ci]);
      const W=820,H=300,PAD={top:24,right:220,bottom:50,left:62};
      const innerW=W-PAD.left-PAD.right;
      const innerH=H-PAD.top-PAD.bottom;
      const parseV=c=>parseFloat(String(c||"0").replace(/[.]/g,"").replace(",","."))||0;
      const allVals=rows.flatMap(r=>graphCols.map(ci=>parseV(r[ci])));
      const objVals=Object.values(table.objectives||{}).map(v=>parseFloat(v)||0);
      const maxVal=Math.max(...allVals,...objVals,1);
      const yScale=v=>innerH-(v/maxVal)*innerH;
      const yTicks=[0,0.25,0.5,0.75,1].map(f=>Math.round(maxVal*f));
      const xStep=innerW/rows.length;
      const barW=Math.max(4,Math.floor(xStep/Math.max(cols.length,1))-3);
      const isLine=table.chartType==="line";
      const sp=[];
      yTicks.forEach(v=>{
        const y=PAD.top+yScale(v);
        const lbl=v>=1000?(v/1000).toFixed(0)+"k":String(v);
        sp.push(`<line x1="${PAD.left}" x2="${PAD.left+innerW}" y1="${y}" y2="${y}" stroke="#E0E8F4" stroke-width="1"/><text x="${PAD.left-5}" y="${y+4}" text-anchor="end" font-size="9" fill="#7A8AA0">${lbl}</text>`);
      });
      Object.entries(table.objectives||{}).forEach(([ci,val])=>{
        if(!val)return;
        const y=PAD.top+yScale(parseFloat(val));
        const lbl="Obj "+table.columns[parseInt(ci)]+": "+parseFloat(val).toLocaleString("es-ES");
        sp.push(`<line x1="${PAD.left}" x2="${PAD.left+innerW}" y1="${y}" y2="${y}" stroke="#FF4444" stroke-width="1.5" stroke-dasharray="6,3"/><line x1="${PAD.left+innerW}" x2="${PAD.left+innerW+8}" y1="${y}" y2="${y}" stroke="#FF4444" stroke-width="1.5"/><rect x="${PAD.left+innerW+10}" y="${y-9}" width="210" height="18" rx="4" fill="#FF444415" stroke="#FF4444" stroke-width="1"/><text x="${PAD.left+innerW+16}" y="${y+4}" text-anchor="start" font-size="9" font-weight="700" fill="#FF4444">${lbl}</text>`);
      });
      if(isLine){
        cols.forEach((col,ci)=>{
          const pts=rows.map((r,i)=>`${PAD.left+i*xStep+xStep/2},${PAD.top+yScale(parseV(r[graphCols[ci]]))}`).join(" ");
          sp.push(`<polyline points="${pts}" fill="none" stroke="${COLORS[ci%COLORS.length]}" stroke-width="2.5"/>`);
          rows.forEach((r,i)=>sp.push(`<circle cx="${PAD.left+i*xStep+xStep/2}" cy="${PAD.top+yScale(parseV(r[graphCols[ci]]))}" r="3.5" fill="${COLORS[ci%COLORS.length]}"/>`));
        });
      } else {
        rows.forEach((r,i)=>{
          const gW=cols.length*(barW+2);
          const gX=PAD.left+i*xStep+(xStep-gW)/2;
          cols.forEach((col,ci)=>{
            const v=parseV(r[graphCols[ci]]);
            const bh=Math.max((v/maxVal)*innerH,0);
            sp.push(`<rect x="${gX+ci*(barW+2)}" y="${PAD.top+innerH-bh}" width="${barW}" height="${bh}" fill="${COLORS[ci%COLORS.length]}" rx="2"/>`);
          });
        });
      }
      rows.forEach((r,i)=>sp.push(`<text x="${PAD.left+i*xStep+xStep/2}" y="${H-PAD.bottom+14}" text-anchor="middle" font-size="9" fill="#7A8AA0">${r[0]}</text>`));
      cols.forEach((col,ci)=>sp.push(`<g transform="translate(${PAD.left+ci*110},${H-8})"><rect x="0" y="-7" width="10" height="10" fill="${COLORS[ci%COLORS.length]}" rx="2"/><text x="14" y="4" font-size="9" fill="#7A8AA0">${col}</text></g>`));
      const svg=`<svg width="${W}" height="${H}" style="display:block;margin:0 auto;max-width:100%">${sp.join("")}</svg>`;
      // Filter out empty columns
      const nonEmpty=table.columns.map((_,ci)=>ci).filter(ci=>ci===0||rows.some(r=>r[ci]&&String(r[ci]).trim()!==""));
      const thCells=nonEmpty.map((ci,j)=>`<th style="padding:8px 12px;text-align:${j===0?"left":"right"};font-size:11px;color:#1A3A6E;font-weight:700;border-bottom:2px solid #1A3A6E44;white-space:nowrap">${table.columns[ci]}</th>`).join("");
      const tbRows=rows.map((r,ri)=>{
        const cells=nonEmpty.map((ci,j)=>`<td style="padding:6px 12px;font-size:12px;border-bottom:1px solid #EEF2F8;font-weight:${j===0?700:400};color:${j===0?"#1A3A6E":"#333"};text-align:${j===0?"left":"right"}">${j===0?String(r[ci]||""):fmtN(r[ci])}</td>`).join("");
        return `<tr style="background:${ri%2===0?"#fff":"#F7FAFF"}">${cells}</tr>`;
      }).join("");
      return `<div class="kpi-table-wrap" style="margin-bottom:24px;page-break-inside:avoid;break-inside:avoid;"><div style="font-size:13px;font-weight:700;color:#1A3A6E;margin-bottom:10px">${table.name}</div>${svg}<div style="overflow-x:auto;margin-top:12px"><table style="width:100%;border-collapse:collapse;border:1px solid #E0E8F4;border-radius:8px;overflow:hidden"><thead><tr style="background:#EEF3FB">${thCells}</tr></thead><tbody>${tbRows}</tbody></table></div></div>`;
    }).join("");
    if(!tablesHtml)return "";
    return `<div style="margin-bottom:24px"><div style="display:flex;align-items:center;gap:8px;margin-bottom:14px"><div style="width:4px;height:18px;background:#1A3A6E;border-radius:2px"></div><span style="font-size:12px;font-weight:800;color:#1A3A6E;letter-spacing:.5px;text-transform:uppercase">📊 KPIs del proyecto</span></div>${tablesHtml}</div>`;
  };

  const sections=projects.map(proj=>{
    const tasks=allTasks.filter(t=>(t.labels||[]).some(l=>l.text===proj));
    const labelColor=(allTasks.flatMap(t=>t.labels||[]).find(l=>l.text===proj)||{}).color||"#1A3A6E";

    const completed=tasks.filter(t=>{
      if(!t.done)return false;
      if(projFrom&&t.completedAt&&t.completedAt<projFrom)return false;
      if(projTo&&t.completedAt&&t.completedAt>projTo)return false;
      return true;
    }).sort((a,b)=>(b.completedAt||"").localeCompare(a.completedAt||""));
    const active=tasks.filter(t=>!t.done&&(t.status==="en-curso"||t.status==="escalado")).sort((a,b)=>(a.deadline||"z").localeCompare(b.deadline||"z"));
    const blocked=tasks.filter(t=>!t.done&&t.status==="bloqueado");
    const backlog=tasks.filter(t=>!t.done&&!active.includes(t)&&!blocked.includes(t));

    const PORD={alta:0,media:1,baja:2};
    const sortP=(arr)=>[...arr].sort((a,b)=>(PORD[a.priority||"media"]||1)-(PORD[b.priority||"media"]||1));

    const mkRow=(t,type)=>{
      const owners=[...(t.checklist||[]).map(i=>i.owner).filter(Boolean),...(t.owner?[t.owner]:[])];
      const uniqueOwners=[...new Set(owners)];
      const dl=t.deadline?`<span style="font-size:11px;color:#888">${t.deadline}</span>`:"";
      const statusColors={backlog:{bg:"#F0F0F8",c:"#666"},"en-curso":{bg:"#FFF8E0",c:"#AA8800"},escalado:{bg:"#F3EEFF",c:"#7744CC"},bloqueado:{bg:"#FFF0F0",c:"#CC2222"}};
      const tStatus=t.status||"backlog";
      const sc=statusColors[tStatus]||statusColors.backlog;
      const statusLabel={backlog:"📋 Backlog","en-curso":"⚡ En curso",escalado:"🔺 Escalado",bloqueado:"🔒 Bloqueado"}[tStatus]||"Backlog";
      const badge=type==="done"
        ?`<span style="background:#E8FAE8;color:#2A7A34;padding:2px 8px;border-radius:99px;font-size:10px;font-weight:700;">✓ ${t.completedAt||""}</span>`
        :`<div><span style="background:${sc.bg};color:${sc.c};padding:3px 10px;border-radius:99px;font-size:11px;font-weight:700;display:inline-block;white-space:nowrap;">${statusLabel}</span>${tStatus==="bloqueado"&&t.blockReason?`<div style="margin-top:4px;font-size:10px;color:#CC2222;font-style:italic;">🔒 ${t.blockReason}</div>`:""}</div>`;
      const prioColor={alta:"#CC2222",media:"#AA8800",baja:"#2A7A34"}[t.priority||"media"];
      const ownerStr=uniqueOwners.length>0?`<div style="font-size:11px;color:#666;margin-top:3px;">👤 ${uniqueOwners.join(", ")}</div>`:"";
      return`<tr>
        <td style="padding:10px 12px;border-bottom:1px solid #EEF2F8;vertical-align:top;">
          <div style="font-size:13px;color:#1A1A2E;font-weight:500;">${t.text||""}</div>
          ${ownerStr}
        </td>
        <td style="padding:10px 12px;border-bottom:1px solid #EEF2F8;vertical-align:top;white-space:nowrap;">
          <span style="font-size:11px;">${t.catIcon||""} ${t.catName||""}</span>
        </td>
        <td style="padding:10px 12px;border-bottom:1px solid #EEF2F8;vertical-align:top;white-space:nowrap;">
          <span style="color:${prioColor};font-size:11px;font-weight:700;">${t.priority||"media"}</span>
        </td>
        <td style="padding:10px 12px;border-bottom:1px solid #EEF2F8;vertical-align:top;white-space:nowrap;min-width:110px;">${badge}</td>
      </tr>`;
    };

    const completedRows=sortP(completed).map(t=>mkRow(t,"done")).join("");
    const activeRows=sortP(active).map(t=>mkRow(t,"active")).join("");
    const backlogRows=sortP(backlog).map(t=>mkRow(t,"backlog")).join("");

    const blockedRows=blocked.map(t=>{
      const prioColor={alta:"#CC2222",media:"#AA8800",baja:"#2A7A34"}[t.priority||"media"];
      const owners=[...(t.checklist||[]).map(i=>i.owner).filter(Boolean),...(t.owner?[t.owner]:[])];
      const uniqueOwners=[...new Set(owners)];
      return `<tr style="background:#FFF5F5;">
        <td style="padding:8px 12px;font-size:12px;border-bottom:1px solid #FFE0E0;color:#1A1A2E;">${t.text}</td>
        <td style="padding:8px 12px;font-size:11px;border-bottom:1px solid #FFE0E0;color:#888;">${t.category||""}</td>
        <td style="padding:8px 12px;font-size:11px;border-bottom:1px solid #FFE0E0;color:${prioColor};font-weight:700;">${t.priority||"media"}</td>
        <td style="padding:8px 12px;font-size:11px;border-bottom:1px solid #FFE0E0;">
          <span style="background:#FF444422;color:#CC2222;padding:3px 10px;border-radius:99px;font-size:11px;font-weight:700;">🔒 Bloqueada</span>
          ${t.blockReason?`<div style="margin-top:5px;font-size:11px;color:#CC2222;font-style:italic;">Motivo: ${t.blockReason}</div>`:""}
        </td>
      </tr>`;
    }).join("");
    const mkBlockedSection=(arr,lc)=>{
      if(arr.length===0)return"";
      return `<div class="report-section" style="margin-bottom:24px;page-break-inside:avoid;break-inside:avoid;">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
          <div style="width:4px;height:18px;background:#FF4444;border-radius:2px;"></div>
          <span style="font-size:12px;font-weight:800;color:#CC2222;letter-spacing:.5px;text-transform:uppercase;">🔒 BLOQUEADAS</span>
          <span style="background:#FFE0E0;color:#CC2222;padding:2px 9px;border-radius:99px;font-size:11px;font-weight:700;">${arr.length}</span>
        </div>
        <table style="width:100%;border-collapse:collapse;border:1px solid #FFD0D0;border-radius:10px;overflow:hidden;">
          <thead><tr style="background:#FFE8E8;">
            <th style="padding:8px 12px;text-align:left;font-size:11px;color:#CC2222;font-weight:700;border-bottom:1px solid #FFD0D0;">Tarea</th>
            <th style="padding:8px 12px;text-align:left;font-size:11px;color:#CC2222;font-weight:700;border-bottom:1px solid #FFD0D0;">Categoría</th>
            <th style="padding:8px 12px;text-align:left;font-size:11px;color:#CC2222;font-weight:700;border-bottom:1px solid #FFD0D0;">Prioridad</th>
            <th style="padding:8px 12px;text-align:left;font-size:11px;color:#CC2222;font-weight:700;border-bottom:1px solid #FFD0D0;">Estado / Motivo</th>
          </tr></thead>
          <tbody>${blockedRows}</tbody>
        </table>
      </div>`;
    };
    const mkSection=(title,rows,count,bg)=>count===0?"":
      `<div class="report-section" style="margin-bottom:24px;page-break-inside:avoid;break-inside:avoid;">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
          <div style="width:4px;height:18px;background:${labelColor};border-radius:2px;"></div>
          <span style="font-size:12px;font-weight:800;color:#1A3A6E;letter-spacing:.5px;text-transform:uppercase;">${title}</span>
          <span style="background:#EEF2F8;color:#1A3A6E;padding:2px 9px;border-radius:99px;font-size:11px;font-weight:700;">${count}</span>
        </div>
        <table style="width:100%;border-collapse:collapse;border:1px solid #E0E8F4;border-radius:10px;overflow:hidden;">
          <thead><tr style="background:#EEF2F8;">
            <th style="padding:8px 12px;text-align:left;font-size:11px;color:#1A3A6E;font-weight:700;border-bottom:1px solid #D0DCF0;">Tarea</th>
            <th style="padding:8px 12px;text-align:left;font-size:11px;color:#1A3A6E;font-weight:700;border-bottom:1px solid #D0DCF0;">Categoría</th>
            <th style="padding:8px 12px;text-align:left;font-size:11px;color:#1A3A6E;font-weight:700;border-bottom:1px solid #D0DCF0;">Prioridad</th>
            <th style="padding:8px 12px;text-align:left;font-size:11px;color:#1A3A6E;font-weight:700;border-bottom:1px solid #D0DCF0;">Estado</th>
          </tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>`;

    // Build Gantt
    const mkGantt=(()=>{
      const allT=[...active,...blocked,...backlog].filter(t=>t.deadline);
      if(allT.length===0)return "";
      const today_d=new Date();

      // Compute date range in weeks
      const dates=allT.map(t=>new Date(t.deadline));
      const minD=new Date(Math.min(...dates.map(d=>d.getTime()),today_d.getTime()));
      const maxD=new Date(Math.max(...dates.map(d=>d.getTime()),today_d.getTime()));
      // Snap to week boundaries (Monday)
      const dayOfWeek=d=>{const v=d.getDay();return v===0?6:v-1;};
      const snapMon=d=>{const r=new Date(d);r.setDate(r.getDate()-dayOfWeek(r));r.setHours(0,0,0,0);return r;};
      const snapSun=d=>{const r=new Date(d);r.setDate(r.getDate()+(6-dayOfWeek(r)));r.setHours(0,0,0,0);return r;};
      const rangeStart=snapMon(minD);
      rangeStart.setDate(rangeStart.getDate()-7); // 1 week padding left
      const rangeEnd=snapSun(maxD);
      rangeEnd.setDate(rangeEnd.getDate()+14); // 2 weeks padding right
      const totalDays=(rangeEnd-rangeStart)/(1000*60*60*24);

      const LABEL_W=240;
      const CHART_W=580;
      const W=LABEL_W+CHART_W;
      const ROW_H=34;
      const MONTH_H=20;
      const WEEK_H=22;
      const HEADER_H=MONTH_H+WEEK_H;
      const PAD_BOT=28;
      const H=HEADER_H+allT.length*ROW_H+PAD_BOT;

      const xOff=d=>((new Date(d)-rangeStart)/(1000*60*60*24))/totalDays*CHART_W;
      const STATUS_C={"en-curso":"#FF9F43",escalado:"#9966FF",bloqueado:"#FF4444",backlog:"#2E5FA3"};

      // Build week columns
      const weeks=[];
      const cur=new Date(rangeStart);
      let weekIdx=0;
      while(cur<=rangeEnd){
        const wStart=new Date(cur);
        const wEnd=new Date(cur);wEnd.setDate(wEnd.getDate()+6);
        const x=LABEL_W+xOff(wStart);
        const wW=xOff(wEnd)-xOff(wStart)+xOff(new Date(cur.getTime()+86400000))-xOff(wStart);
        const weekW=CHART_W/totalDays*7;
        const isEven=weekIdx%2===0;
        // Alternating week background
        weeks.push(`<rect x="${x}" y="${HEADER_H}" width="${weekW}" height="${H-HEADER_H-PAD_BOT}" fill="${isEven?"#F8FAFF":"#F2F5FC"}" opacity="1"/>`);
        // Week number label
        const wNum=Math.ceil((wStart-new Date(wStart.getFullYear(),0,1))/604800000);
        const dd=String(wStart.getDate()).padStart(2,"0");
        const mm=String(wStart.getMonth()+1).padStart(2,"0");
        weeks.push(`<text x="${x+weekW/2}" y="${MONTH_H+13}" text-anchor="middle" font-size="9" font-weight="700" fill="#1A3A6E">S${wNum}</text>`);
        weeks.push(`<text x="${x+weekW/2}" y="${MONTH_H+21}" text-anchor="middle" font-size="7" fill="#9AAABF">${dd}/${mm}</text>`);
        // Vertical separator through whole chart
        weeks.push(`<line x1="${x}" x2="${x}" y1="${MONTH_H}" y2="${H-PAD_BOT}" stroke="#D8E4F0" stroke-width="1"/>`);
        cur.setDate(cur.getDate()+7);
        weekIdx++;
      }

      // Month labels row (top strip above weeks)
      const months=[];
      const mCur=new Date(rangeStart);
      mCur.setDate(1);
      const monthColors=["#1A3A6E","#2E5FA3","#1A5276","#154360","#1A3A6E"];
      let mIdx=0;
      while(mCur<=rangeEnd){
        const x=LABEL_W+xOff(mCur);
        const nextM=new Date(mCur);nextM.setMonth(nextM.getMonth()+1);
        const x2=Math.min(LABEL_W+xOff(nextM),W);
        const mW=x2-x;
        const mc=monthColors[mIdx%monthColors.length];
        months.push(`<rect x="${x}" y="0" width="${mW}" height="${MONTH_H}" fill="${mc}"/>`);
        months.push(`<text x="${x+mW/2}" y="${MONTH_H-5}" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">${mCur.toLocaleDateString("es-ES",{month:"short",year:"2-digit"}).toUpperCase()}</text>`);
        months.push(`<line x1="${x}" x2="${x}" y1="0" y2="${MONTH_H}" stroke="#ffffff44" stroke-width="1"/>`);
        mCur.setMonth(mCur.getMonth()+1);
        mIdx++;
      }

      // Today line
      const todayX=LABEL_W+xOff(today_d);
      const todayLine=`<line x1="${todayX}" x2="${todayX}" y1="${MONTH_H}" y2="${H-PAD_BOT}" stroke="#FF4444" stroke-width="1.5" stroke-dasharray="4,3"/>
        <rect x="${todayX-1}" y="${MONTH_H}" width="24" height="${WEEK_H}" fill="#FF444422"/>
        <text x="${todayX+3}" y="${MONTH_H+14}" font-size="8" font-weight="700" fill="#FF4444">Hoy</text>`;

      // Divider
      const divider=`<line x1="${LABEL_W}" x2="${W}" y1="${HEADER_H}" y2="${HEADER_H}" stroke="#C8D8EC" stroke-width="1.5"/>`;

      // Bars
      const bars=allT.map((t,i)=>{
        const y=HEADER_H+i*ROW_H;
        const statusKey=t.status||"backlog";
        const color=STATUS_C[statusKey]||"#2E5FA3";
        const endD=new Date(t.deadline);
        const startD=t.createdAt?new Date(t.createdAt):new Date(today_d);
        const x1=LABEL_W+Math.max(0,xOff(startD));
        const x2=LABEL_W+xOff(endD);
        const barW=Math.max(x2-x1,6);
        const isLate=endD<today_d;
        const cy=y+ROW_H/2;

        // Word-wrap label
        const words=t.text.split(" ");
        let ln1="",ln2="";
        for(const w of words){
          if((ln1+" "+w).trim().length<=28)ln1=(ln1+" "+w).trim();
          else if((ln2+" "+w).trim().length<=28)ln2=(ln2+" "+w).trim();
        }
        const labelEl=ln2
          ?`<text text-anchor="end" font-size="10" fill="#1A3A6E"><tspan x="${LABEL_W-8}" y="${cy-4}">${ln1}</tspan><tspan x="${LABEL_W-8}" dy="13">${ln2}</tspan></text>`
          :`<text x="${LABEL_W-8}" y="${cy+4}" text-anchor="end" font-size="10" fill="#1A3A6E">${ln1}</text>`;

        // Checklist progress
        const chkItems=(t.checklist||[]);
        const chkDone=chkItems.filter(c=>c.state==="Completada"||c.done).length;
        const chkTotal=chkItems.length;
        const pct=chkTotal>0?chkDone/chkTotal:null;
        const progressBar=pct!==null
          ?`<rect x="${x1}" y="${y+6}" width="${barW}" height="${ROW_H-12}" rx="4" fill="${color}" opacity="0.2"/>
            <rect x="${x1}" y="${y+6}" width="${Math.max(barW*pct,pct>0?5:0)}" height="${ROW_H-12}" rx="4" fill="${color}" opacity="0.9"/>`
          :`<rect x="${x1}" y="${y+6}" width="${barW}" height="${ROW_H-12}" rx="4" fill="${color}" opacity="0.85"/>`;

        // Deadline label on bar
        const deadlineLabel=isLate
          ?`<text x="${Math.min(x2+4,W-40)}" y="${cy+4}" font-size="9" fill="#FF4444" font-weight="700">⚠ ${t.deadline}</text>`
          :pct===null?`<text x="${Math.min(x2+4,W-50)}" y="${cy+4}" font-size="8" fill="#9AAABF">${t.deadline}</text>`
          :`<text x="${Math.min(x2+barW/2,W-30)}" y="${cy+4}" text-anchor="middle" font-size="9" fill="${color}" font-weight="700">${Math.round(pct*100)}%</text>`;

        return `<g>
          ${labelEl}
          ${progressBar}
          ${deadlineLabel}
        </g>`;
      }).join("");

      // Legend
      const legendItems=[["#2E5FA3","Backlog"],["#FF9F43","En curso"],["#9966FF","Escalado"],["#FF4444","Bloqueado"]];
      const legendItemW=Math.floor(W/legendItems.length);
      const legend=legendItems.map(([c,l],i)=>`<g transform="translate(${i*legendItemW+legendItemW/2-30},${H-10})"><rect x="0" y="-8" width="10" height="10" fill="${c}" rx="2" opacity=".88"/><text x="14" y="3" font-size="9" fill="#7A8AA0">${l}</text></g>`).join("");

      return `<div class="report-section" style="margin-bottom:24px;page-break-inside:avoid;break-inside:avoid;">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
          <div style="width:4px;height:18px;background:#2E5FA3;border-radius:2px;"></div>
          <span style="font-size:12px;font-weight:800;color:#1A3A6E;letter-spacing:.5px;text-transform:uppercase;">📅 Gantt de tareas</span>
        </div>
        <div style="overflow-x:auto;">
          <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMinYMin meet" style="display:block;font-family:inherit;border-radius:8px;border:1px solid #E0E8F4;max-width:100%;height:auto;">
            <rect width="${W}" height="${H}" fill="#FAFCFF" rx="8"/>
            <rect x="${LABEL_W}" y="${MONTH_H}" width="${CHART_W}" height="${WEEK_H}" fill="#EEF3FB"/>
            <rect x="0" y="0" width="${LABEL_W}" height="${H}" fill="#F7FAFF"/>
            ${weeks.join("")}
            ${months.join("")}
            ${divider}
            ${todayLine}
            ${bars}
            ${legend}
          </svg>
        </div>
      </div>`;
    })();

    return`
    <div class="project-section" style="margin-bottom:48px;">
      <div style="background:linear-gradient(135deg,#1A3A6E,#2E5FA3);border-radius:12px;padding:20px 24px;margin-bottom:20px;color:#fff;display:flex;justify-content:space-between;align-items:center;">
        <div>
          <div style="font-size:10px;font-weight:700;letter-spacing:2px;opacity:.7;text-transform:uppercase;margin-bottom:4px;">Proyecto</div>
          <div style="font-size:22px;font-weight:800;">${proj}</div>
        </div>
        <div style="text-align:right;font-size:12px;opacity:.8;">
          <div>${completed.length} completadas · ${active.length} en curso · ${blocked.length>0?blocked.length+" bloqueadas · ":""}${backlog.length} backlog</div>
          <div style="margin-top:4px;opacity:.6;font-size:10px;">Última actualización: ${today_}</div>
        </div>
      </div>
      ${mkGantt}
      ${mkSection("✓ Completadas",completedRows,completed.length,"#E8FAE8")}
      ${mkSection("⚡ En curso",activeRows,active.length,"#FFF8E0")}
      ${mkBlockedSection(blocked,labelColor)}
      ${mkSection("📋 Backlog",backlogRows,backlog.length,"#F0F0F8")}
      ${completed.length===0&&active.length===0&&backlog.length===0?`<p style="color:#aaa;text-align:center;padding:20px;">No hay tareas asignadas a este proyecto.</p>`:""}
    <div class="kpi-block" style="page-break-inside:avoid;break-inside:avoid;">${buildKPISection(proj,kpiData)}</div>
    </div>`;
  }).join('<div style="border-top:2px dashed #E0E8F4;margin:32px 0;"></div>');

  const html=`<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Informe Proyectos · mardetareas · ${today_}</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:'Segoe UI',system-ui,sans-serif;background:#F5F8FF;color:#1A1A2E;padding:32px 24px;}
  .page{max-width:900px;margin:0 auto;}
  @media print{
    body{background:#fff;padding:16px;}
    @page{margin:1.5cm;size:A4;}
    .project-section{page-break-inside:avoid;}
    *{-webkit-print-color-adjust:exact;print-color-adjust:exact;}
    body{margin:0!important;}
    .project-section{page-break-before:auto!important;}
    .project-section:first-of-type{page-break-before:avoid!important;}
  }
  .footer{text-align:center;color:#AAA;font-size:11px;margin-top:32px;padding-top:16px;border-top:1px solid #E0E8F4;}
  tr:last-child td{border-bottom:none!important;}
</style>
</head>
<body>
<div class="page">
  ${sections}
  <div class="footer">Generado por mardetareas · ${new Date().toLocaleString("es-ES")} · Ctrl+P para exportar a PDF</div>
</div>
</body>
</html>`;

  const blob=new Blob([html],{type:"text/html;charset=utf-8"});
  const url=URL.createObjectURL(blob);
  const a=document.createElement("a");
  a.href=url;a.download=`informe_proyectos_${today_}.html`;
  document.body.appendChild(a);a.click();document.body.removeChild(a);URL.revokeObjectURL(url);
}

async function exportHistorialXLSX(doneTasks){
  // ── Compute stats ──
  const byCat={};
  doneTasks.forEach(t=>{
    if(!byCat[t.catName])byCat[t.catName]={total:0,alta:0,media:0,baja:0,diasTotal:0,conDias:0,icon:t.catIcon||"📁"};
    byCat[t.catName].total++;
    byCat[t.catName][t.priority||"media"]++;
    const ini=t.createdAt?new Date(t.createdAt+"T00:00:00"):null;
    const fin=t.completedAt?new Date(t.completedAt+"T00:00:00"):null;
    if(ini&&fin){byCat[t.catName].diasTotal+=Math.round((fin-ini)/86400000);byCat[t.catName].conDias++;}
  });
  const catEntries=Object.entries(byCat).sort((a,b)=>b[1].total-a[1].total);
  const byMonth={};
  doneTasks.forEach(t=>{
    if(!t.completedAt)return;
    const m=t.completedAt.slice(0,7);
    byMonth[m]=(byMonth[m]||0)+1;
  });
  const monthEntries=Object.entries(byMonth).sort();
  const tasksWithPrio=doneTasks.filter(t=>t.priority&&(t.catType!=="meeting"&&t.catType!=="meeting121eq"));
  const alta=tasksWithPrio.filter(t=>t.priority==="alta").length;
  const media=tasksWithPrio.filter(t=>t.priority==="media").length;
  const baja=tasksWithPrio.filter(t=>t.priority==="baja").length;
  const prioTotal=alta+media+baja;
  const maxCat=Math.max(...catEntries.map(([,v])=>v.total),1);
  const maxMonth=Math.max(...monthEntries.map(([,n])=>n),1);

  // ── Excel: raw data ──
  const {utils,write}=await import("https://cdn.sheetjs.com/xlsx-0.20.3/package/xlsx.mjs");
  const wb=utils.book_new();
  const dataRows=[
    ["Tarea","Categoría","Prioridad","Fecha Inicio","Fecha Fin","Deadline","Días activa"],
    ...doneTasks.map(t=>{
      const ini=t.createdAt?new Date(t.createdAt+"T00:00:00"):null;
      const fin=t.completedAt?new Date(t.completedAt+"T00:00:00"):null;
      const dias=ini&&fin?Math.round((fin-ini)/86400000):"";
      return[t.text||"",t.catName||"",t.priority||"",t.createdAt||"",t.completedAt||"",t.deadline||"",dias];
    })
  ];
  const ws1=utils.aoa_to_sheet(dataRows);
  ws1["!cols"]=[{wch:45},{wch:18},{wch:10},{wch:14},{wch:14},{wch:14},{wch:12}];
  utils.book_append_sheet(wb,ws1,"Historial");
  const buf=write(wb,{type:"array",bookType:"xlsx"});
  const blob=new Blob([buf],{type:"application/octet-stream"});
  const url=URL.createObjectURL(blob);
  const a=document.createElement("a");a.href=url;a.download=`historial_datos_${today()}.xlsx`;
  document.body.appendChild(a);a.click();document.body.removeChild(a);URL.revokeObjectURL(url);

  // ── HTML Dashboard ──
  const catBars=catEntries.map(([cat,v])=>{
    const pct=Math.round((v.total/maxCat)*100);
    const altaPct=v.total?Math.round((v.alta/v.total)*100):0;
    const mediaPct=v.total?Math.round((v.media/v.total)*100):0;
    const bajaPct=v.total?Math.round((v.baja/v.total)*100):0;
    const dias=v.conDias>0?Math.round(v.diasTotal/v.conDias):0;
    return`<div class="bar-row">
      <div class="bar-label">${v.icon} ${cat}</div>
      <div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div>
      <div class="bar-val">${v.total}</div>
      <div class="bar-pills">
        ${v.alta>0?`<span class="pill alta">${v.alta} alta</span>`:""}
        ${v.media>0?`<span class="pill media">${v.media} media</span>`:""}
        ${v.baja>0?`<span class="pill baja">${v.baja} baja</span>`:""}
        ${dias>0?`<span class="pill days">${dias}d prom</span>`:""}
      </div>
    </div>`;
  }).join("");

  const monthBars=monthEntries.map(([m,n])=>{
    const pct=Math.round((n/maxMonth)*100);
    const [yr,mo]=m.split("-");
    const mName=["","Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"][parseInt(mo)];
    return`<div class="month-col">
      <div class="month-bar-wrap"><div class="month-bar" style="height:${Math.max(pct,4)}%"></div></div>
      <div class="month-val">${n}</div>
      <div class="month-lbl">${mName}<br/><span style="font-size:9px;opacity:.6">${yr}</span></div>
    </div>`;
  }).join("");

  const prioPct=doneTasks.length?[
    {l:"Alta",v:alta,pct:Math.round((alta/doneTasks.length)*100),c:"#FF6B6B"},
    {l:"Media",v:media,pct:Math.round((media/doneTasks.length)*100),c:"#FFD93D"},
    {l:"Baja",v:baja,pct:Math.round((baja/doneTasks.length)*100),c:"#6BCB77"},
  ]:[];
  let prioOffset=0;
  const prioSegments=prioPct.map(p=>{
    const seg=`<div class="prio-seg" style="width:${p.pct}%;background:${p.c}" title="${p.l}: ${p.v}"></div>`;
    prioOffset+=p.pct;return seg;
  }).join("");
  const prioLegend=prioPct.map(p=>`<span class="prio-leg"><span style="background:${p.c}"></span>${p.l} ${p.pct}%</span>`).join("");

  const html=`<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Dashboard · mardetareas · ${today()}</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:'Segoe UI',system-ui,sans-serif;background:#EEF3FB;color:#1A1A2E;padding:32px 24px;}
  @media print{
    body{background:#fff;padding:8px;}
    @page{margin:1.2cm;size:A4;}
    .header{background:#1A3A6E!important;-webkit-print-color-adjust:exact;print-color-adjust:exact;border-radius:10px;}
    .kpi,.card{box-shadow:none;border:1px solid #E0D8F8;break-inside:avoid;}
    .kpis{grid-template-columns:repeat(4,1fr);}
    .bar-fill,.month-bar{-webkit-print-color-adjust:exact;print-color-adjust:exact;}
    .pill{-webkit-print-color-adjust:exact;print-color-adjust:exact;}
  }
  * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .page{max-width:900px;margin:0 auto;}
  /* Header */
  .header{background:linear-gradient(135deg,#1A3A6E,#0F2347);border-radius:16px;padding:28px 32px;color:#fff;margin-bottom:24px;display:flex;justify-content:space-between;align-items:flex-end;}
  .header h1{font-size:26px;font-weight:800;letter-spacing:-0.5px;}
  .header p{font-size:12px;opacity:.7;margin-top:4px;}
  .header-right{text-align:right;font-size:12px;opacity:.8;}
  /* KPI grid */
  .kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:24px;}
  .kpi{background:#fff;border-radius:12px;padding:18px 16px;text-align:center;box-shadow:0 2px 12px #1A3A6E11;border:1px solid #D8E6F8;}
  .kpi-val{font-size:32px;font-weight:800;line-height:1;}
  .kpi-lbl{font-size:10px;color:#888;font-weight:600;letter-spacing:.8px;text-transform:uppercase;margin-top:5px;}
  .kpi.total .kpi-val{color:#1A3A6E;}
  .kpi.alta .kpi-val{color:#CC2222;}
  .kpi.media .kpi-val{color:#AA8800;}
  .kpi.baja .kpi-val{color:#2A7A34;}
  /* Cards */
  .card{background:#fff;border-radius:14px;padding:22px 24px;margin-bottom:20px;box-shadow:0 2px 12px #1A3A6E0A;border:1px solid #D8E6F8;}
  .card-title{font-size:13px;font-weight:800;color:#1A3A6E;letter-spacing:.5px;text-transform:uppercase;margin-bottom:18px;display:flex;align-items:center;gap:8px;}
  .card-title::before{content:"";display:inline-block;width:4px;height:16px;background:#1A3A6E;border-radius:2px;}
  /* Bar chart */
  .bar-row{display:flex;align-items:center;gap:10px;margin-bottom:12px;}
  .bar-label{width:140px;font-size:12px;font-weight:600;color:#333;flex-shrink:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
  .bar-track{flex:1;height:20px;background:#F0EAF8;border-radius:99px;overflow:hidden;}
  .bar-fill{height:100%;background:linear-gradient(90deg,#1A3A6E,#2E5FA3);border-radius:99px;transition:width .4s;}
  .bar-val{width:28px;font-size:13px;font-weight:800;color:#1A3A6E;text-align:right;flex-shrink:0;}
  .bar-pills{display:flex;gap:4px;flex-wrap:wrap;width:180px;flex-shrink:0;}
  .pill{font-size:10px;font-weight:700;padding:2px 7px;border-radius:99px;}
  .pill.alta{background:#FFE0E0;color:#CC2222;}
  .pill.media{background:#FFFBE0;color:#AA8800;}
  .pill.baja{background:#E8FAE8;color:#2A7A34;}
  .pill.days{background:#E0ECFF;color:#1A3A6E;}
  /* Month chart */
  .month-chart{display:flex;align-items:flex-end;gap:12px;height:160px;padding:0 4px;}
  .month-col{display:flex;flex-direction:column;align-items:center;flex:1;}
  .month-bar-wrap{flex:1;width:100%;display:flex;align-items:flex-end;justify-content:center;}
  .month-bar{width:70%;background:linear-gradient(180deg,#2E5FA3,#1A3A6E);border-radius:6px 6px 0 0;min-height:4px;}
  .month-val{font-size:12px;font-weight:800;color:#1A3A6E;margin-top:4px;}
  .month-lbl{font-size:10px;color:#888;text-align:center;margin-top:2px;}
  /* Priority bar */
  .prio-bar{display:flex;height:28px;border-radius:99px;overflow:hidden;margin-bottom:12px;}
  .prio-seg{height:100%;transition:width .4s;}
  .prio-legend{display:flex;gap:16px;flex-wrap:wrap;}
  .prio-leg{display:flex;align-items:center;gap:6px;font-size:12px;font-weight:600;}
  .prio-leg span{width:12px;height:12px;border-radius:3px;display:inline-block;}
  /* Table */
  .tbl{width:100%;border-collapse:collapse;font-size:12px;}
  .tbl th{background:#EEF3FB;color:#1A3A6E;font-weight:700;padding:8px 12px;text-align:left;border-bottom:2px solid #E0D8F8;}
  .tbl td{padding:8px 12px;border-bottom:1px solid #F0EAF8;color:#333;}
  .tbl tr:last-child td{border-bottom:none;}
  .tbl tr:hover td{background:#F5F9FF;}
  .badge{display:inline-block;padding:2px 8px;border-radius:99px;font-size:10px;font-weight:700;}
  .b-alta{background:#FFE0E0;color:#CC2222;}
  .b-media{background:#FFFBE0;color:#AA8800;}
  .b-baja{background:#E8FAE8;color:#2A7A34;}
  /* Footer */
  .footer{text-align:center;color:#AAA;font-size:11px;margin-top:24px;padding-top:16px;border-top:1px solid #D8E6F8;}
  /* Print */
  @media print{.card,.kpi{break-inside:avoid;box-shadow:none;}}
  /* Two columns for larger screens */
  @media(min-width:700px){.two-col{display:grid;grid-template-columns:1fr 1fr;gap:20px;}}
</style>
</head>
<body>
<div class="page">
  <div class="header">
    <div>
      <h1>🌊 mardetareas</h1>
      <p>Dashboard · Historial de tareas completadas</p>
    </div>
    <div class="header-right">
      <div style="font-size:22px;font-weight:800;">${doneTasks.length}</div>
      <div>tareas completadas</div>
      <div style="margin-top:4px;opacity:.6">${today()}</div>
    </div>
  </div>

  <div class="kpis">
    <div class="kpi total"><div class="kpi-val">${doneTasks.length}</div><div class="kpi-lbl">Total completadas</div></div>
    <div class="kpi alta"><div class="kpi-val">${alta}</div><div class="kpi-lbl">Alta prioridad</div></div>
    <div class="kpi media"><div class="kpi-val">${media}</div><div class="kpi-lbl">Media prioridad</div></div>
    <div class="kpi baja"><div class="kpi-val">${baja}</div><div class="kpi-lbl">Baja prioridad</div></div>
  </div>

  <div class="card">
    <div class="card-title">Distribución por prioridad</div>
    ${prioTotal>0?`
    <div style="display:flex;height:32px;border-radius:99px;overflow:hidden;margin-bottom:14px;box-shadow:inset 0 1px 4px #0001;">
      ${alta>0?`<div style="width:${Math.round((alta/prioTotal)*100)}%;background:#FF6B6B;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff;">${Math.round((alta/prioTotal)*100)}%</div>`:""}
      ${media>0?`<div style="width:${Math.round((media/prioTotal)*100)}%;background:#FFD93D;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#7A6000;">${Math.round((media/prioTotal)*100)}%</div>`:""}
      ${baja>0?`<div style="width:${Math.round((baja/prioTotal)*100)}%;background:#6BCB77;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff;">${Math.round((baja/prioTotal)*100)}%</div>`:""}
    </div>
    <div style="display:flex;gap:20px;flex-wrap:wrap;">
      ${alta>0?`<span style="display:flex;align-items:center;gap:7px;font-size:13px;font-weight:600;"><span style="width:14px;height:14px;border-radius:3px;background:#FF6B6B;display:inline-block;"></span>Alta &nbsp;<strong style="color:#CC2222">${alta}</strong> (${Math.round((alta/prioTotal)*100)}%)</span>`:""}
      ${media>0?`<span style="display:flex;align-items:center;gap:7px;font-size:13px;font-weight:600;"><span style="width:14px;height:14px;border-radius:3px;background:#FFD93D;display:inline-block;"></span>Media &nbsp;<strong style="color:#AA8800">${media}</strong> (${Math.round((media/prioTotal)*100)}%)</span>`:""}
      ${baja>0?`<span style="display:flex;align-items:center;gap:7px;font-size:13px;font-weight:600;"><span style="width:14px;height:14px;border-radius:3px;background:#6BCB77;display:inline-block;"></span>Baja &nbsp;<strong style="color:#2A7A34">${baja}</strong> (${Math.round((baja/prioTotal)*100)}%)</span>`:""}
    </div>
    <p style="font-size:10px;color:#aaa;margin-top:8px;">* Reuniones 121 excluidas del cálculo de prioridad</p>`:"<p style='color:#aaa'>Sin datos de prioridad</p>"}
  </div>

  <div class="card">
    <div class="card-title">Completadas por categoría</div>
    ${catBars}
  </div>

  ${monthEntries.length>1?`<div class="card">
    <div class="card-title">Completadas por mes</div>
    <div class="month-chart">${monthBars}</div>
  </div>`:""}

  <div class="card">
    <div class="card-title">Últimas tareas completadas</div>
    <table class="tbl">
      <thead><tr><th>Tarea</th><th>Categoría</th><th>Prioridad</th><th>Completada</th></tr></thead>
      <tbody>${(()=>{
        const PORD={alta:0,media:1,baja:2};
        const catOrder=[...new Set(doneTasks.map(t=>t.catName))];
        return [...doneTasks].sort((a,b)=>{
          const ci=catOrder.indexOf(a.catName)-catOrder.indexOf(b.catName);
          if(ci!==0)return ci;
          return (PORD[a.priority||"media"]||1)-(PORD[b.priority||"media"]||1);
        }).map(t=>`<tr>
          <td>${t.text||""}</td>
          <td>${t.catIcon||""} ${t.catName||""}</td>
          <td><span class="badge b-${t.priority||"media"}">${(t.priority==="alta"?"🔴 alta":t.priority==="baja"?"🟢 baja":"🟡 media")}</span></td>
          <td>${t.completedAt||"—"}</td>
        </tr>`).join("");
      })()}</tbody>
    </table>
  </div>

  <div class="footer">Generado por mardetareas · ${new Date().toLocaleString("es-ES")} · Usa Ctrl+P para guardar como PDF</div>
</div>
</body>
</html>`;

  // Download HTML
  setTimeout(()=>{
    const hblob=new Blob([html],{type:"text/html;charset=utf-8"});
    const hurl=URL.createObjectURL(hblob);
    const ha=document.createElement("a");ha.href=hurl;ha.download=`dashboard_${today()}.html`;
    document.body.appendChild(ha);ha.click();document.body.removeChild(ha);URL.revokeObjectURL(hurl);
  },500);
}
function exportMeeting(meeting,catName){
  const h=["Reunión","Categoría","Colaborador","Fecha","Estado","Punto","Est.Punto","Deadline Punto","Próx. Acción","Arrastrado"];
  downloadCSV(`reunion_${meeting.meetingId}.csv`,[h,...(meeting.checklist||[]).map(i=>[meeting.meetingId,catName,meeting.collaborator||"",meeting.date,meeting.state,i.text,i.state,i.deadline||"",i.nextActions||"",i.carriedFrom?"Sí":"No"])]);
}
function exportAllMeetings(cats){
  const h=["Reunión","Categoría","Colaborador","Fecha","Estado","Punto","Est.Punto","Deadline Punto","Próx. Acción","Arrastrado"];
  const rows=[];
  cats.filter(c=>c.type==="meeting"||c.type==="meeting121eq").forEach(cat=>{
    cat.tasks.forEach(m=>(m.checklist||[]).forEach(i=>rows.push([m.meetingId,cat.name,m.collaborator||"",m.date,m.state,i.text,i.state,i.deadline||"",i.nextActions||"",i.carriedFrom?"Sí":"No"])));
  });
  downloadCSV(`todas_reuniones_${today()}.csv`,[h,...rows]);
}

// ── Normal Checklist ──────────────────────────────────────────
function Checklist({items,color,th,onChange}){
  const [nw,setNw]=useState("");
  const [dragIdx,setDragIdx]=useState(null);
  const [dragOverIdx,setDragOverIdx]=useState(null);
  const done=items.filter(i=>i.done).length;
  const add=()=>{if(!nw.trim())return;onChange([...items,{id:genId(),text:nw.trim(),done:false}]);setNw("");};
  const moveItem=(from,to)=>{
    const arr=[...items];
    const [moved]=arr.splice(from,1);
    arr.splice(to,0,moved);
    onChange(arr);
  };
  return(<div>
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:7}}><SL th={th}>Checklist</SL>{items.length>0&&<span style={{fontSize:10,color:done===items.length?"#6BCB77":th.text5}}>{done}/{items.length}</span>}</div>
    {items.length>0&&<div style={{height:3,background:th.border2,borderRadius:99,marginBottom:9}}><div style={{height:3,borderRadius:99,background:done===items.length?"#6BCB77":color.accent,width:`${(done/items.length)*100}%`,transition:"width 0.3s"}}/></div>}
    {items.map((item,idx)=>(<div key={item.id} style={{marginBottom:6,opacity:dragIdx===idx?0.4:1,borderRadius:6,outline:dragOverIdx===idx&&dragIdx!==idx?`2px dashed ${color.accent}`:"none"}}
      draggable
      onDragStart={()=>setDragIdx(idx)}
      onDragOver={e=>{e.preventDefault();setDragOverIdx(idx);}}
      onDrop={e=>{e.preventDefault();if(dragIdx!==null&&dragIdx!==idx)moveItem(dragIdx,idx);setDragIdx(null);setDragOverIdx(null);}}
      onDragEnd={()=>{setDragIdx(null);setDragOverIdx(null);}}>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <span style={{color:th.text6,fontSize:11,cursor:"grab",flexShrink:0,paddingRight:2}} title="Arrastrar para reordenar">⠿</span>
        <div onClick={()=>onChange(items.map(i=>i.id===item.id?{...i,done:!i.done}:i))} style={{width:15,height:15,borderRadius:4,flexShrink:0,cursor:"pointer",border:item.done?"none":`1.5px solid ${color.accent}55`,background:item.done?color.accent:"transparent",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,color:"#000"}}>{item.done&&"✓"}</div>
        <input value={item.text} onChange={e=>onChange(items.map(i=>i.id===item.id?{...i,text:e.target.value}:i))} style={{flex:1,background:"transparent",border:"none",outline:"none",color:item.done?th.text5:th.text3,fontSize:12,textDecoration:item.done?"line-through":"none"}}/>
        <span onClick={()=>onChange(items.filter(i=>i.id!==item.id))} style={{color:th.text6,cursor:"pointer",fontSize:12}}>✕</span>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:5,paddingLeft:23,marginTop:3}}>
        <span style={{fontSize:10,color:th.text5}}>👤</span>
        <input value={item.owner||""} onChange={e=>onChange(items.map(i=>i.id===item.id?{...i,owner:e.target.value}:i))} placeholder="Owner..." style={{background:"transparent",border:"none",borderBottom:`1px solid ${th.border2}`,outline:"none",color:th.text4,fontSize:11,width:140,padding:"1px 2px"}}/>
      </div>
    </div>))}
    <div style={{display:"flex",gap:6,marginTop:6}}>
      <input value={nw} onChange={e=>setNw(e.target.value)} onKeyDown={e=>e.key==="Enter"&&add()} placeholder="Añadir punto..." style={{...inp(th),flex:1,fontSize:12,padding:"5px 9px"}}/>
      <button onClick={add} style={{padding:"5px 11px",borderRadius:7,background:color.light,border:`1px solid ${color.accent}44`,color:color.tc,fontSize:12,cursor:"pointer"}}>＋</button>
    </div>
  </div>);
}

// ── Meeting Checklist ─────────────────────────────────────────
function MeetingChecklist({items=[],color,th,onChange}){
  const [nw,setNw]=useState("");const [nDl,setNDl]=useState("");
  const dark=th.bg===DARK.bg;
  const completadas=items.filter(i=>i.state==="Completada").length;
  const pendientes=items.filter(i=>i.state!=="Completada"&&i.state!=="Bloqueada");
  const cycleState=(id)=>onChange(items.map(i=>{if(i.id!==id)return i;const idx=CHK_STATES.indexOf(i.state);return{...i,state:CHK_STATES[(idx+1)%CHK_STATES.length]};}));
  const add=()=>{if(!nw.trim())return;onChange([...items,{...mkChkItem(nw.trim()),deadline:nDl||null}]);setNw("");setNDl("");};
  return(<div>
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:7}}>
      <SL th={th}>Puntos de la reunión</SL>
      <div style={{display:"flex",gap:10,alignItems:"center"}}>
        {items.length>0&&<span style={{fontSize:10,color:completadas===items.length?"#6BCB77":th.text5}}>{completadas}/{items.length}</span>}
        {pendientes.length>0&&<span style={{fontSize:10,color:"#FF9F43",fontWeight:700}}>↩ {pendientes.length} siguen</span>}
      </div>
    </div>
    {items.length>0&&<div style={{height:3,background:th.border2,borderRadius:99,marginBottom:10}}><div style={{height:3,borderRadius:99,background:completadas===items.length?"#6BCB77":color.accent,width:items.length?`${(completadas/items.length)*100}%`:"0%",transition:"width 0.3s"}}/></div>}
    {items.map(item=>{
      const s=cst(item.state,dark);const dl=dlStatus(item.deadline);
      return(<div key={item.id} style={{marginBottom:6,padding:"7px 9px",borderRadius:9,background:th.subBg,border:`1px solid ${item.carriedFrom?"#FF9F4333":th.border2}`}}>
        <div style={{display:"flex",alignItems:"center",gap:7}}>
          <button onClick={()=>cycleState(item.id)} style={{flexShrink:0,padding:"2px 8px",borderRadius:99,fontSize:10,fontWeight:700,cursor:"pointer",border:`1.5px solid ${s.color}`,background:s.background,color:s.color,whiteSpace:"nowrap"}}>{s.icon} {item.state}</button>
          <input value={item.text} onChange={e=>onChange(items.map(i=>i.id===item.id?{...i,text:e.target.value}:i))} placeholder="Descripción del punto..." style={{flex:1,background:"transparent",border:"none",outline:"none",color:item.state==="Completada"?th.text5:th.text2,fontSize:12.5,textDecoration:item.state==="Completada"?"line-through":"none"}}/>
          {dl&&<span style={{fontSize:10,fontWeight:700,color:dl.color,background:dl.color+"22",padding:"1px 6px",borderRadius:99,flexShrink:0}}>{dl.label}</span>}
          {item.carriedFrom&&<span style={{fontSize:9,color:"#FF9F43",background:"#FF9F4322",padding:"1px 5px",borderRadius:3,flexShrink:0}}>anterior</span>}
          <span onClick={()=>onChange(items.filter(i=>i.id!==item.id))} style={{color:th.text6,cursor:"pointer",fontSize:12,flexShrink:0}}>✕</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:6,marginTop:5,paddingLeft:2}}>
          <span style={{fontSize:10,color:th.text5}}>📅 Deadline:</span>
          <input type="date" value={item.deadline||""} onChange={e=>onChange(items.map(i=>i.id===item.id?{...i,deadline:e.target.value||null}:i))} style={{background:"transparent",border:`1px solid ${th.border2}`,borderRadius:5,outline:"none",color:item.deadline?th.text3:th.text6,fontSize:11,padding:"2px 6px",colorScheme:dark?"dark":"light"}}/>
        </div>
        <div style={{display:"flex",alignItems:"flex-start",gap:6,marginTop:5,paddingLeft:2}}>
          <span style={{fontSize:10,color:th.text5,marginTop:3,flexShrink:0}}>⚡ Próx. acción:</span>
          <textarea value={item.nextActions||""} onChange={e=>onChange(items.map(i=>i.id===item.id?{...i,nextActions:e.target.value}:i))} placeholder="¿Qué hay que hacer a continuación?" rows={1} style={{flex:1,background:"transparent",border:`1px solid ${th.border2}`,borderRadius:5,outline:"none",color:th.text3,fontSize:11,padding:"3px 7px",resize:"vertical",fontFamily:"inherit",lineHeight:1.4}}/>
        </div>
      </div>);
    })}
    <div style={{background:th.border3,borderRadius:9,padding:"8px 10px",marginTop:8,display:"flex",flexDirection:"column",gap:7}}>
      <div style={{display:"flex",gap:6}}>
        <input value={nw} onChange={e=>setNw(e.target.value)} onKeyDown={e=>e.key==="Enter"&&add()} placeholder="Nuevo punto..." style={{...inp(th),flex:1,fontSize:12,padding:"5px 9px"}}/>
        <button onClick={add} style={{padding:"5px 12px",borderRadius:7,background:color.light,border:`1px solid ${color.accent}44`,color:color.tc,fontSize:13,fontWeight:700,cursor:"pointer"}}>＋</button>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:6}}>
        <span style={{fontSize:10,color:th.text5}}>📅 Deadline:</span>
        <input type="date" value={nDl} onChange={e=>setNDl(e.target.value)} style={{...inp(th,{fontSize:11,padding:"3px 6px",colorScheme:dark?"dark":"light"})}}/>
      </div>
    </div>
  </div>);
}

// ── Labels ────────────────────────────────────────────────────
const LABEL_PALETTE=["#FF6B6B","#FF9F43","#FFD93D","#6BCB77","#4ECDC4","#74B9FF","#C3A6FF","#FD79A8","#A0A0B8"];

function Labels({labels=[],th,bank=[],onBankChange,onChange}){
  const [adding,setAdding]=useState(false);
  const [nw,setNw]=useState("");
  const [color,setColor]=useState(LABEL_PALETTE[0]);
  const [showBank,setShowBank]=useState(false);

  const add=()=>{
    if(!nw.trim())return;
    const lb={id:genId(),text:nw.trim(),color};
    onChange([...labels,lb]);
    // Save to bank if not already there
    if(!bank.find(b=>b.text===lb.text)){
      onBankChange([...bank,{id:genId(),text:lb.text,color:lb.color}]);
    }
    setNw("");setAdding(false);
  };

  const applyFromBank=(lb)=>{
    if(labels.find(l=>l.text===lb.text))return;
    onChange([...labels,{id:genId(),text:lb.text,color:lb.color}]);
  };

  const removeFromBank=(id)=>onBankChange(bank.filter(b=>b.id!==id));
  const unusedBank=bank.filter(b=>!labels.find(l=>l.text===b.text));

  return(<div>
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:6}}>
      <SL th={th}>Etiquetas</SL>
      {bank.length>0&&<button onClick={()=>setShowBank(s=>!s)} style={{fontSize:10,background:"transparent",border:"none",color:th.text5,cursor:"pointer",padding:"0 4px"}}>🏷️ {showBank?"Ocultar banco":"Ver banco"} ({bank.length})</button>}
    </div>

    {/* Bank manager panel */}
    {showBank&&<div style={{marginBottom:10,background:th.subBg,borderRadius:9,padding:"10px 12px",border:`1px solid ${th.border2}`}}>
      <div style={{fontSize:10,fontWeight:700,color:th.text5,letterSpacing:1,textTransform:"uppercase",marginBottom:8}}>Etiquetas guardadas</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
        {bank.map(lb=>(<span key={lb.id} style={{display:"inline-flex",alignItems:"center",gap:5,padding:"3px 10px",borderRadius:99,fontSize:11,fontWeight:600,background:lb.color+"22",color:lb.color,border:`1px solid ${lb.color}44`}}>
          {lb.text}
          <span onClick={()=>removeFromBank(lb.id)} style={{cursor:"pointer",fontSize:10,opacity:0.5}} title="Eliminar del banco">✕</span>
        </span>))}
      </div>
      <div style={{fontSize:10,color:th.text6,marginTop:6}}>Eliminar no afecta a tareas existentes.</div>
    </div>}

    {/* Applied labels */}
    <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:7}}>
      {labels.map(lb=>(<span key={lb.id} style={{display:"inline-flex",alignItems:"center",gap:4,padding:"2px 8px",borderRadius:99,fontSize:11,fontWeight:600,background:lb.color+"22",color:lb.color,border:`1px solid ${lb.color}44`}}>
        {lb.text}
        <span onClick={()=>onChange(labels.filter(l=>l.id!==lb.id))} style={{cursor:"pointer",fontSize:10,opacity:0.6}}>✕</span>
      </span>))}
      {labels.length===0&&<span style={{fontSize:11,color:th.text6}}>Sin etiquetas</span>}
    </div>

    {/* Unused bank quick-apply */}
    {unusedBank.length>0&&<div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:8}}>
      {unusedBank.map(lb=>(<button key={lb.id} onClick={()=>applyFromBank(lb)}
        style={{display:"inline-flex",alignItems:"center",gap:3,padding:"2px 9px",borderRadius:99,fontSize:11,fontWeight:600,
          background:"transparent",color:lb.color,border:`1.5px dashed ${lb.color}99`,cursor:"pointer"}}>
        ＋ {lb.text}
      </button>))}
    </div>}

    {/* New label toggle */}
    {!adding&&<button onClick={()=>setAdding(true)} style={{padding:"3px 11px",borderRadius:99,fontSize:11,border:`1px dashed ${th.border}`,background:"transparent",color:th.text5,cursor:"pointer"}}>＋ Nueva etiqueta</button>}

    {/* New label form */}
    {adding&&<div style={{display:"flex",flexDirection:"column",gap:7,background:th.subBg,borderRadius:9,padding:"9px 10px",border:`1px solid ${th.border2}`,marginTop:7}}>
      <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>{LABEL_PALETTE.map(c=><div key={c} onClick={()=>setColor(c)} style={{width:18,height:18,borderRadius:99,background:c,cursor:"pointer",border:color===c?`2px solid ${th.text}`:"2px solid transparent"}}/>)}</div>
      <div style={{display:"flex",gap:6}}>
        <input autoFocus value={nw} onChange={e=>setNw(e.target.value)} onKeyDown={e=>e.key==="Enter"&&add()} placeholder="Nombre..." style={{...inp(th),flex:1,fontSize:12,padding:"5px 9px"}}/>
        <button onClick={add} style={{padding:"5px 12px",borderRadius:7,background:color,border:"none",color:"#fff",fontWeight:800,fontSize:12,cursor:"pointer"}}>＋</button>
        <button onClick={()=>setAdding(false)} style={{padding:"5px 10px",borderRadius:7,background:th.border,border:"none",color:th.text4,fontSize:12,cursor:"pointer"}}>✕</button>
      </div>
    </div>}
  </div>);
}

// ── Contacts ──────────────────────────────────────────────────
function Contacts({items=[],color,th,onChange}){
  const [show,setShow]=useState(false);const [nn,setNn]=useState("");const [ne,setNe]=useState("");
  const add=()=>{if(!nn.trim()&&!ne.trim())return;onChange([...items,{id:genId(),name:nn.trim(),email:ne.trim()}]);setNn("");setNe("");setShow(false);};
  return(<div>
    <SL th={th}>Contactos</SL>
    {items.map(c=>(<div key={c.id} style={{display:"flex",alignItems:"center",gap:9,padding:"6px 9px",borderRadius:8,background:th.subBg,border:`1px solid ${th.border2}`,marginBottom:5}}>
      <div style={{width:24,height:24,borderRadius:99,background:color.light,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:color.tc,fontWeight:700,flexShrink:0}}>{(c.name||c.email||"?")[0].toUpperCase()}</div>
      <input value={c.name} onChange={e=>onChange(items.map(i=>i.id===c.id?{...i,name:e.target.value}:i))} placeholder="Nombre..." style={{background:"transparent",border:"none",outline:"none",color:th.text,fontSize:12,fontWeight:600,flex:1}}/>
      <input value={c.email} onChange={e=>onChange(items.map(i=>i.id===c.id?{...i,email:e.target.value}:i))} placeholder="email..." style={{background:"transparent",border:"none",outline:"none",color:"#5E9EFF",fontSize:11,flex:1}}/>
      <span onClick={()=>onChange(items.filter(i=>i.id!==c.id))} style={{color:th.text6,cursor:"pointer",fontSize:12,flexShrink:0}}>✕</span>
    </div>))}
    {show?(<div style={{background:th.subBg,border:`1px solid ${th.border}`,borderRadius:9,padding:10,display:"flex",gap:6,flexWrap:"wrap"}}>
      <input autoFocus value={nn} onChange={e=>setNn(e.target.value)} placeholder="Nombre..." style={{...inp(th),flex:1,minWidth:100}}/>
      <input value={ne} onChange={e=>setNe(e.target.value)} onKeyDown={e=>e.key==="Enter"&&add()} placeholder="email..." style={{...inp(th),flex:2,minWidth:130,color:"#5E9EFF"}}/>
      <button onClick={add} style={{padding:"6px 12px",borderRadius:7,background:color.accent,border:"none",color:"#fff",fontWeight:800,fontSize:12,cursor:"pointer"}}>＋</button>
      <button onClick={()=>setShow(false)} style={{padding:"6px 10px",borderRadius:7,background:th.border,border:"none",color:th.text4,fontSize:12,cursor:"pointer"}}>✕</button>
    </div>):(<button onClick={()=>setShow(true)} style={{width:"100%",padding:"6px 0",borderRadius:8,border:`1.5px dashed ${th.border}`,background:"transparent",color:th.text6,fontSize:11.5,cursor:"pointer"}}>＋ Añadir contacto</button>)}
  </div>);
}

// ── Task Row ──────────────────────────────────────────────────
function TaskRow({task,color,th,onToggle,onDelete,onUpdate,showInPersonal=false,labelBank=[],onLabelBankChange=()=>{}}){
  const [exp,setExp]=useState(false);const [editT,setEditT]=useState(false);
  const dark=th.bg===DARK.bg;const dl=dlStatus(task.deadline);const p=PRIORITY[task.priority];
  const chkD=(task.checklist||[]).filter(i=>i.done).length;const chkT=(task.checklist||[]).length;
  return(<div style={{background:task.done?th.rowDone:th.rowBg,borderRadius:12,marginBottom:8,border:`1px solid ${task.done?th.border3:(dl?.urgent?dl.color+"44":th.border)}`,opacity:task.done?0.55:1,transition:"all 0.2s",boxShadow:dark?"none":"0 1px 4px #0001"}}>
    <div style={{display:"flex",alignItems:"center",gap:10,padding:"11px 13px",cursor:task.done?"default":"pointer"}} onClick={()=>!task.done&&!editT&&setExp(e=>!e)}>
      <div onClick={e=>{e.stopPropagation();onToggle();}} style={{width:19,height:19,borderRadius:99,flexShrink:0,cursor:"pointer",border:task.done?"none":`2px solid ${color.accent}`,background:task.done?color.accent:"transparent",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:"#fff",transition:"all 0.2s"}}>{task.done&&"✓"}</div>
      <span style={{fontSize:10,flexShrink:0}}>{p.dot}</span>
      {!editT&&!task.done&&(()=>{const tk=TASK_KIND[task.taskKind||"tarea"];return(<span style={{fontSize:10,padding:"2px 7px",borderRadius:99,fontWeight:700,flexShrink:0,background:tk.bg,color:tk.color,border:`1px solid ${tk.color}44`,whiteSpace:"nowrap"}}>{tk.icon} {tk.label}</span>);})()}
      {editT&&!task.done?(<input autoFocus value={task.text} onChange={e=>onUpdate({text:e.target.value})} onBlur={()=>setEditT(false)} onKeyDown={e=>{if(e.key==="Enter"||e.key==="Escape")setEditT(false);}} onClick={e=>e.stopPropagation()} style={{flex:1,...inp(th,{border:`1px solid ${color.accent}66`,fontSize:13.5,padding:"2px 8px"})}}/>):(
        <span onDoubleClick={e=>{e.stopPropagation();if(!task.done)setEditT(true);}} style={{flex:1,fontSize:13.5,color:task.done?th.text4:th.text2,textDecoration:task.done?"line-through":"none",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{task.text}</span>
      )}
      {!task.done&&!editT&&<span onClick={e=>{e.stopPropagation();setEditT(true);}} style={{color:th.text6,cursor:"pointer",fontSize:11,flexShrink:0}}>✎</span>}
      {task.jiraUrl&&!task.done&&<a href={task.jiraUrl} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()} style={{fontSize:10,fontWeight:700,color:"#5E9EFF",background:dark?"#0D1E35":"#EBF4FF",padding:"2px 7px",borderRadius:5,border:"1px solid #1A3A6A",textDecoration:"none",flexShrink:0}}>JIRA ↗</a>}
      {chkT>0&&!task.done&&<span style={{fontSize:10,color:chkD===chkT?"#6BCB77":th.text5,flexShrink:0}}>☑ {chkD}/{chkT}</span>}
      {(task.labels||[]).map(lb=>(<span key={lb.id} style={{fontSize:10,fontWeight:600,color:lb.color,background:lb.color+"22",padding:"1px 7px",borderRadius:99,flexShrink:0,border:`1px solid ${lb.color}33`}}>{lb.text}</span>))}
      {dl&&!task.done&&<span style={{fontSize:11,fontWeight:700,color:dl.color,background:dl.color+"22",padding:"2px 8px",borderRadius:99,flexShrink:0}}>{dl.label}</span>}
      {!task.done&&<span style={{color:th.text6,fontSize:11,flexShrink:0,transform:exp?"rotate(180deg)":"none",transition:"transform 0.2s"}}>▾</span>}
      <span onClick={e=>{e.stopPropagation();onDelete();}} style={{color:th.text6,cursor:"pointer",fontSize:13,flexShrink:0}}>✕</span>
    </div>
    {!task.done&&(task.status||"backlog")!=="backlog"&&(
      <div style={{display:"flex",alignItems:"center",gap:8,padding:"4px 13px 6px",borderTop:`1px solid ${th.border2}22`}}>
        {(()=>{const s=TASK_STATUS[task.status||"backlog"];return(
          <span style={{fontSize:11,fontWeight:700,color:s.color,background:s.bg,padding:"2px 10px",borderRadius:6,borderLeft:`3px solid ${s.color}`}}>
            {s.icon} {s.label}
          </span>
        );})()}
        {(task.status||"backlog")==="bloqueado"&&task.blockReason&&(
          <span style={{fontSize:11,color:"#FF4444",fontStyle:"italic",opacity:.8}}>— {task.blockReason}</span>
        )}
      </div>
    )}
    {exp&&!task.done&&(<div style={{borderTop:`1px solid ${th.border2}`,padding:14}}>
      <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:14}}>
        <div style={{flex:1,minWidth:140}}><SL th={th}>Tipo</SL><div style={{display:"flex",gap:5,flexWrap:"wrap"}}>{Object.entries(TASK_KIND).map(([k,v])=>(<button key={k} onClick={()=>onUpdate({taskKind:k})} style={{padding:"3px 10px",borderRadius:99,fontSize:11,cursor:"pointer",fontWeight:task.taskKind===k?700:400,background:task.taskKind===k?v.bg:"transparent",color:task.taskKind===k?v.color:th.text5,border:`1px solid ${task.taskKind===k?v.color+"66":"transparent"}`}}>{v.icon} {v.label}</button>))}
            <span style={{color:th.border,margin:"0 4px"}}>|</span>
            {Object.entries(PRIORITY).map(([k])=>(<button key={k} onClick={()=>onUpdate({priority:k})} style={{padding:"3px 10px",borderRadius:99,fontSize:11.5,cursor:"pointer",...ps(k,task.priority===k,dark)}}>{PRIORITY[k].label}</button>))}</div></div>
        <div style={{flex:1,minWidth:150}}><SL th={th}>Deadline</SL>
          <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}>
            <input type="date" value={task.deadline||""} onChange={e=>onUpdate({deadline:e.target.value||null})} style={{...inp(th),colorScheme:dark?"dark":"light"}}/>
            <select value={task.recurrence||""} onChange={e=>onUpdate({recurrence:e.target.value||null})}
              style={{...inp(th,{fontSize:11,cursor:"pointer"})}} title="Recurrencia">
              <option value="">🔁 Sin recurrencia</option>
              <option value="daily">📅 Diaria</option>
              <option value="weekly">📆 Semanal</option>
              <option value="biweekly">📆 Quincenal</option>
              <option value="monthly">🗓️ Mensual</option>
            </select>
            {task.recurrence&&<span style={{fontSize:10,color:"#FF9F43",fontWeight:700,background:"#FF9F4322",padding:"2px 8px",borderRadius:99}}>🔁 {({daily:"Diaria",weekly:"Semanal",biweekly:"Quincenal",monthly:"Mensual"})[task.recurrence]}</span>}
          </div></div>
        <div style={{flex:"0 0 100%"}}><SL th={th}>Estado</SL><div style={{display:"flex",gap:5,flexWrap:"wrap"}}>{Object.entries(TASK_STATUS).map(([k,v])=>(<button key={k} onClick={()=>onUpdate({status:k})} style={{padding:"4px 12px",borderRadius:99,border:"none",cursor:"pointer",fontSize:11,fontWeight:700,background:(task.status||"backlog")===k?v.bg:"transparent",color:(task.status||"backlog")===k?v.color:th.text5}}>{v.icon} {v.label}</button>))}</div></div>
      </div>
      {(task.status||"backlog")==="bloqueado"&&(
        <div style={{marginBottom:14,padding:"10px 12px",borderRadius:8,background:dark?"#2A1515":"#FFF0F0",border:"1px solid #FF444433"}}>
          <SL th={th}>🔒 Motivo del bloqueo</SL>
          <input value={task.blockReason||""} onChange={e=>onUpdate({blockReason:e.target.value})}
            placeholder="Describe por qué está bloqueada..." style={{...inp(th,{fontSize:12,width:"100%",marginTop:4})}}/>
        </div>
      )}
      <div style={{marginBottom:14}}><SL th={th}>Ticket Jira</SL><div style={{display:"flex",gap:7,alignItems:"center"}}><input value={task.jiraUrl||""} onChange={e=>onUpdate({jiraUrl:e.target.value})} placeholder="https://jira.empresa.com/browse/PROJ-123" style={{...inp(th),flex:1,fontFamily:"monospace"}}/>{task.jiraUrl&&<a href={task.jiraUrl} target="_blank" rel="noreferrer" style={{padding:"5px 10px",borderRadius:7,background:dark?"#0D1E35":"#EBF4FF",border:"1px solid #1A3A6A",color:"#5E9EFF",fontSize:12,textDecoration:"none",fontWeight:700,flexShrink:0}}>Abrir ↗</a>}</div></div>
      <div style={{marginBottom:14}}><SL th={th}>Descripción</SL><textarea value={task.description||""} onChange={e=>onUpdate({description:e.target.value})} placeholder="Contexto, notas..." rows={3} style={{width:"100%",boxSizing:"border-box",...inp(th,{resize:"vertical",lineHeight:1.6,fontFamily:"inherit"})}}/></div>
      <div style={{marginBottom:14}}><Checklist items={task.checklist||[]} color={color} th={th} onChange={cl=>onUpdate({checklist:cl})}/></div>
      <div style={{marginBottom:14}}><Labels labels={task.labels||[]} th={th} bank={labelBank} onBankChange={onLabelBankChange} onChange={lb=>onUpdate({labels:lb})}/></div>
      <div style={{marginBottom:12}}><Contacts items={task.contacts||[]} color={color} th={th} onChange={ct=>onUpdate({contacts:ct})}/></div>
      <div style={{display:"flex",gap:16,flexWrap:"wrap",paddingTop:10,borderTop:`1px solid ${th.border2}`}}>
        <span style={{color:th.text6,fontSize:10}}>📅 Creada: <span style={{color:th.text4}}>{fmt(task.createdAt)}</span></span>
        {task.deadline&&<span style={{color:th.text6,fontSize:10}}>⏱ Deadline: <span style={{color:th.text4}}>{fmt(task.deadline)}</span></span>}
      {task.recurrence&&<span style={{fontSize:10,color:"#FF9F43",fontWeight:700,background:"#FF9F4322",padding:"1px 7px",borderRadius:99}}>🔁 {({daily:"Diaria",weekly:"Semanal",biweekly:"Quincenal",monthly:"Mensual"})[task.recurrence]}</span>}
      </div>
    </div>)}
  </div>);
}

// ── Meeting Row (121 Manager) ─────────────────────────────────
function MeetingRow({meeting,color,th,catName,onUpdate,onDelete,onToggle,onExport}){
  const [exp,setExp]=useState(false);
  const dark=th.bg===DARK.bg;const sc=msc(meeting.state,dark);
  const chk=meeting.checklist||[];const comp=chk.filter(i=>i.state==="Completada").length;
  const pend=chk.filter(i=>i.state!=="Completada"&&i.state!=="Bloqueada");
  return(<div style={{background:meeting.done?th.rowDone:th.rowBg,borderRadius:12,marginBottom:8,border:`1px solid ${meeting.done?th.border3:th.border}`,opacity:meeting.done?0.55:1,transition:"all 0.2s",boxShadow:dark?"none":"0 1px 4px #0001"}}>
    <div style={{display:"flex",alignItems:"center",gap:10,padding:"11px 13px",cursor:"pointer"}} onClick={()=>!meeting.done&&setExp(e=>!e)}>
      <div onClick={e=>{e.stopPropagation();onToggle();}} style={{width:19,height:19,borderRadius:99,flexShrink:0,cursor:"pointer",border:meeting.done?"none":`2px solid ${color.accent}`,background:meeting.done?color.accent:"transparent",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:"#fff"}}>{meeting.done&&"✓"}</div>
      <span style={{fontSize:10,fontFamily:"monospace",color:color.tc,background:color.light,padding:"1px 6px",borderRadius:4,flexShrink:0}}>{meeting.meetingId}</span>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontSize:12.5,color:meeting.done?th.text4:th.text2,marginBottom:2,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{chk.length>0?`${chk.length} punto${chk.length!==1?"s":""} · ${comp} completado${comp!==1?"s":""}`:"Sin puntos aún"}</div>
        {chk.length>0&&<div style={{height:2,background:th.border2,borderRadius:99}}><div style={{height:2,borderRadius:99,background:comp===chk.length?"#6BCB77":color.accent,width:`${(comp/chk.length)*100}%`,transition:"width 0.3s"}}/></div>}
      </div>
      {pend.length>0&&!meeting.done&&<span style={{fontSize:10,color:"#FF9F43",background:"#FF9F4322",border:"1px solid #FF9F4344",borderRadius:5,padding:"2px 6px",flexShrink:0,fontWeight:700}}>↩{pend.length}</span>}
      <span style={{fontSize:10,color:th.text5,flexShrink:0,minWidth:70}}>{fmt(meeting.date)}</span>
      <span style={{fontSize:10,fontWeight:700,color:sc.color,background:sc.background,padding:"2px 8px",borderRadius:99,flexShrink:0}}>{meeting.state}</span>
      {!meeting.done&&<span style={{color:th.text6,fontSize:11,flexShrink:0,transform:exp?"rotate(180deg)":"none",transition:"transform 0.2s"}}>▾</span>}
      <span onClick={e=>{e.stopPropagation();onDelete();}} style={{color:th.text6,cursor:"pointer",fontSize:13,flexShrink:0}}>✕</span>
    </div>
    {exp&&!meeting.done&&(<div style={{borderTop:`1px solid ${th.border2}`,padding:14,display:"flex",flexDirection:"column",gap:14}}>
      <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
        <div style={{flex:1,minWidth:110}}><SL th={th}>ID</SL><input value={meeting.meetingId} onChange={e=>onUpdate({meetingId:e.target.value})} style={{...inp(th),width:"100%",boxSizing:"border-box",fontFamily:"monospace",color:color.tc}}/></div>
        <div style={{flex:1,minWidth:130}}><SL th={th}>Fecha</SL><input type="date" value={meeting.date||""} onChange={e=>onUpdate({date:e.target.value})} style={{...inp(th),width:"100%",boxSizing:"border-box",colorScheme:dark?"dark":"light"}}/></div>
      </div>
      <div><SL th={th}>Estado</SL><div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{MTG_STATES.map(s=>{const sc2=msc(s,dark);return(<button key={s} onClick={()=>onUpdate({state:s})} style={{padding:"4px 12px",borderRadius:99,fontSize:12,cursor:"pointer",border:`1.5px solid ${meeting.state===s?sc2.color:th.border}`,background:meeting.state===s?sc2.background:"transparent",color:meeting.state===s?sc2.color:th.text4,fontWeight:meeting.state===s?700:400}}>{s}</button>);})}</div></div>
      <MeetingChecklist items={chk} color={color} th={th} onChange={cl=>onUpdate({checklist:cl})}/>
      <div><SL th={th}>Notas</SL><textarea value={meeting.notes||""} onChange={e=>onUpdate({notes:e.target.value})} placeholder="Observaciones..." rows={2} style={{width:"100%",boxSizing:"border-box",...inp(th,{resize:"vertical",lineHeight:1.6,fontFamily:"inherit"})}}/></div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",paddingTop:8,borderTop:`1px solid ${th.border2}`,flexWrap:"wrap",gap:8}}>
        <span style={{color:th.text6,fontSize:10}}>📅 {fmt(meeting.createdAt)}{pend.length>0&&<span style={{color:"#FF9F43"}}> · ↩ {pend.length} pasarán a la siguiente</span>}</span>
        <button onClick={()=>onExport(meeting)} style={{padding:"5px 12px",borderRadius:7,background:dark?"#0F2215":"#EDFAEF",border:"1px solid #6BCB7766",color:"#6BCB77",fontSize:11,fontWeight:700,cursor:"pointer"}}>⬇ Excel</button>
      </div>
    </div>)}
  </div>);
}

// ── Team Meeting Row ──────────────────────────────────────────
function TeamMeetingRow({meeting,color,th,catName,onUpdate,onSetCollaborator,onDelete,onToggle,onExport}){
  const [exp,setExp]=useState(false);
  const dark=th.bg===DARK.bg;const sc=msc(meeting.state,dark);
  const chk=meeting.checklist||[];const comp=chk.filter(i=>i.state==="Completada").length;
  const pend=chk.filter(i=>i.state!=="Completada"&&i.state!=="Bloqueada");
  return(<div style={{background:meeting.done?th.rowDone:th.rowBg,borderRadius:12,marginBottom:8,border:`1px solid ${meeting.done?th.border3:th.border}`,opacity:meeting.done?0.55:1,transition:"all 0.2s",boxShadow:dark?"none":"0 1px 4px #0001"}}>
    <div style={{display:"flex",alignItems:"center",gap:10,padding:"11px 13px",cursor:"pointer"}} onClick={()=>!meeting.done&&setExp(e=>!e)}>
      <div onClick={e=>{e.stopPropagation();onToggle();}} style={{width:19,height:19,borderRadius:99,flexShrink:0,cursor:"pointer",border:meeting.done?"none":`2px solid ${color.accent}`,background:meeting.done?color.accent:"transparent",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:"#fff"}}>{meeting.done&&"✓"}</div>
      <div style={{width:28,height:28,borderRadius:99,background:color.light,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:color.tc,fontWeight:800,flexShrink:0}}>{meeting.collaborator?meeting.collaborator[0].toUpperCase():"?"}</div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontSize:13,fontWeight:700,color:meeting.done?th.text4:th.text,marginBottom:1,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{meeting.collaborator||<span style={{color:th.text6,fontStyle:"italic",fontWeight:400}}>Sin colaborador</span>}</div>
        <div style={{fontSize:11,color:th.text5}}>{chk.length>0?`${chk.length} punto${chk.length!==1?"s":""} · ${comp} completado${comp!==1?"s":""}` :"Sin puntos"}</div>
      </div>
      {pend.length>0&&!meeting.done&&<span style={{fontSize:10,color:"#FF9F43",background:"#FF9F4322",border:"1px solid #FF9F4344",borderRadius:5,padding:"2px 6px",flexShrink:0,fontWeight:700}}>↩{pend.length}</span>}
      <span style={{fontSize:10,color:th.text5,flexShrink:0,minWidth:70}}>{fmt(meeting.date)}</span>
      <span style={{fontSize:10,fontWeight:700,color:sc.color,background:sc.background,padding:"2px 8px",borderRadius:99,flexShrink:0}}>{meeting.state}</span>
      {!meeting.done&&<span style={{color:th.text6,fontSize:11,flexShrink:0,transform:exp?"rotate(180deg)":"none",transition:"transform 0.2s"}}>▾</span>}
      <span onClick={e=>{e.stopPropagation();onDelete();}} style={{color:th.text6,cursor:"pointer",fontSize:13,flexShrink:0}}>✕</span>
    </div>
    {exp&&!meeting.done&&(<div style={{borderTop:`1px solid ${th.border2}`,padding:14,display:"flex",flexDirection:"column",gap:14}}>
      <div style={{background:color.light,borderRadius:10,padding:"10px 14px",border:`1px solid ${color.accent}33`}}>
        <SL th={th}>Colaborador</SL>
        <input value={meeting.collaborator||""} onChange={e=>onUpdate({collaborator:e.target.value})} onBlur={e=>onSetCollaborator(e.target.value)} placeholder="Nombre del colaborador..." style={{...inp(th,{fontSize:14,fontWeight:700,color:color.tc,background:"transparent",border:"none",padding:"0"}),width:"100%"}}/>
      </div>
      <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
        <div style={{flex:1,minWidth:110}}><SL th={th}>ID</SL><input value={meeting.meetingId} onChange={e=>onUpdate({meetingId:e.target.value})} style={{...inp(th),width:"100%",boxSizing:"border-box",fontFamily:"monospace",color:color.tc}}/></div>
        <div style={{flex:1,minWidth:130}}><SL th={th}>Fecha</SL><input type="date" value={meeting.date||""} onChange={e=>onUpdate({date:e.target.value})} style={{...inp(th),width:"100%",boxSizing:"border-box",colorScheme:dark?"dark":"light"}}/></div>
      </div>
      <div><SL th={th}>Estado</SL><div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{MTG_STATES.map(s=>{const sc2=msc(s,dark);return(<button key={s} onClick={()=>onUpdate({state:s})} style={{padding:"4px 12px",borderRadius:99,fontSize:12,cursor:"pointer",border:`1.5px solid ${meeting.state===s?sc2.color:th.border}`,background:meeting.state===s?sc2.background:"transparent",color:meeting.state===s?sc2.color:th.text4,fontWeight:meeting.state===s?700:400}}>{s}</button>);})}</div></div>
      <MeetingChecklist items={chk} color={color} th={th} onChange={cl=>onUpdate({checklist:cl})}/>
      <div><SL th={th}>Notas</SL><textarea value={meeting.notes||""} onChange={e=>onUpdate({notes:e.target.value})} placeholder="Observaciones..." rows={2} style={{width:"100%",boxSizing:"border-box",...inp(th,{resize:"vertical",lineHeight:1.6,fontFamily:"inherit"})}}/></div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",paddingTop:8,borderTop:`1px solid ${th.border2}`,flexWrap:"wrap",gap:8}}>
        <span style={{color:th.text6,fontSize:10}}>📅 {fmt(meeting.createdAt)}{pend.length>0&&<span style={{color:"#FF9F43"}}> · ↩ {pend.length} puntos seguirán</span>}</span>
        <button onClick={()=>onExport(meeting)} style={{padding:"5px 12px",borderRadius:7,background:dark?"#0F2215":"#EDFAEF",border:"1px solid #6BCB7766",color:"#6BCB77",fontSize:11,fontWeight:700,cursor:"pointer"}}>⬇ Excel</button>
      </div>
    </div>)}
  </div>);
}

// ── Weekly Calendar View ──────────────────────────────────────
function CalendarView({th,dark,calData,onCalDataUpdate}){
  const todayStr=today();
  const [weekStart,setWeekStart]=useState(getWeekStart(todayStr));
  const [selectedMember,setSelectedMember]=useState(null);
  const data=calData||CAL_DATA;

  const weekDates=Array.from({length:5},(_,i)=>addDays(weekStart,i));
  const weekData=weekDates.map(date=>{
    const row=data.find(r=>r.date===date);
    return{date,row:row||null};
  });

  const goWeek=(n)=>setWeekStart(addDays(weekStart,n*7));
  const goToday=()=>setWeekStart(getWeekStart(todayStr));

  const semana=data.find(r=>weekDates.includes(r.date));
  const semanaLabel=semana?.semana||"";

  // Handle Excel upload
  const handleExcelUpload=(e)=>{
    const file=e.target.files[0];if(!file)return;
    const reader=new FileReader();
    reader.onload=async(ev)=>{
      try{
        const {read,utils}=await import("https://cdn.sheetjs.com/xlsx-0.20.3/package/xlsx.mjs");
        const wb=read(new Uint8Array(ev.target.result),{type:"array"});
        const ws=wb.Sheets["Datos 2026"]||wb.Sheets[wb.SheetNames[0]];
        const rows=utils.sheet_to_json(ws,{header:1,defval:""});
        const MES_MAP={ENERO:1,FEBRERO:2,MARZO:3,ABRIL:4,MAYO:5,JUNIO:6,JULIO:7,AGOSTO:8,SEPTIEMBRE:9,OCTUBRE:10,NOVIEMBRE:11,DICIEMBRE:12};
        const WDAYS=["LUNES","MARTES","MIÉRCOLES","JUEVES","VIERNES"];
        const MEMBERS_COL=["IVAN","MAR","SHANE","PABLO","PAU"];
        let currentSemana="";
        const parsed=[];
        rows.slice(1).forEach(row=>{
          const semana=row[0],dia=String(row[1]||"").toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g,""),mes=String(row[2]||"").toUpperCase(),num=row[3];
          if(semana)currentSemana=semana;
          const diaClean=dia.normalize("NFC");
          if(!WDAYS.includes(diaClean)&&!["LUNES","MARTES","MIERCOLES","JUEVES","VIERNES"].includes(dia.replace(/[ÁÉÍÓÚÜ]/g,c=>"AEIOU"["ÁÉÍÓÚ".indexOf(c)]||c)))return;
          const month=MES_MAP[mes];if(!month||!num)return;
          try{
            const d=new Date(2026,month-1,parseInt(num));
            const iso=localISO(d);
            const entry={date:iso,semana:currentSemana,dia:row[1],mes};
            MEMBERS_COL.forEach((m,i)=>{entry[m]=String(row[4+i]||"").trim().toUpperCase();});
            parsed.push(entry);
          }catch{}
        });
        if(parsed.length>0){onCalDataUpdate(parsed);alert(`✅ Calendario actualizado: ${parsed.length} días laborables cargados.`);}
        else{alert("No se encontraron datos. ¿Es el formato correcto?");}
      }catch(err){alert("Error al leer el Excel: "+err.message);}
    };
    reader.readAsArrayBuffer(file);
    e.target.value="";
  };

  return(<div>
    {/* Header */}
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,flexWrap:"wrap",gap:10}}>
      <div>
        <h2 style={{margin:0,color:th.text,fontSize:18,fontWeight:800}}>👥 Calendario del equipo</h2>
        <span style={{color:th.text5,fontSize:11}}>{semanaLabel} · {fmtShort(weekStart)} – {fmtShort(addDays(weekStart,4))}</span>
      </div>
      <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}>
        <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
          <button onClick={()=>setSelectedMember(null)} style={{padding:"4px 10px",borderRadius:99,fontSize:11,cursor:"pointer",border:`1.5px solid ${!selectedMember?"#4ECDC4":th.border}`,background:!selectedMember?dark?"#0F2422":"#E8FAFA":"transparent",color:!selectedMember?"#4ECDC4":th.text5,fontWeight:!selectedMember?700:400}}>Todos</button>
          {CAL_MEMBERS.map(m=>(<button key={m} onClick={()=>setSelectedMember(selectedMember===m?null:m)} style={{padding:"4px 10px",borderRadius:99,fontSize:11,cursor:"pointer",border:`1.5px solid ${selectedMember===m?"#74B9FF":th.border}`,background:selectedMember===m?dark?"#0D1E35":"#EBF4FF":"transparent",color:selectedMember===m?"#74B9FF":th.text5,fontWeight:selectedMember===m?700:400}}>{m[0]+m.slice(1).toLowerCase()}</button>))}
        </div>
        <button onClick={()=>goWeek(-1)} style={{padding:"6px 10px",borderRadius:8,border:`1px solid ${th.border}`,background:th.surface,color:th.text3,cursor:"pointer",fontSize:13}}>‹</button>
        <button onClick={goToday} style={{padding:"6px 10px",borderRadius:8,border:`1px solid ${th.border}`,background:th.surface,color:th.text3,cursor:"pointer",fontSize:11}}>Hoy</button>
        <button onClick={()=>goWeek(1)} style={{padding:"6px 10px",borderRadius:8,border:`1px solid ${th.border}`,background:th.surface,color:th.text3,cursor:"pointer",fontSize:13}}>›</button>
        <label title="Actualizar calendario desde Excel" style={{padding:"6px 11px",borderRadius:8,border:`1px solid ${th.border}`,background:dark?"#0D1E35":"#EBF4FF",color:"#74B9FF",cursor:"pointer",fontSize:11,fontWeight:700,whiteSpace:"nowrap"}}>
          📊 Actualizar Excel
          <input type="file" accept=".xlsx,.xls" style={{display:"none"}} onChange={handleExcelUpload}/>
        </label>
      </div>
    </div>

    {/* Legend */}
    <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:14}}>
      {Object.entries(CAL_STATUS).filter(([k])=>k!=="OTHER").map(([k,v])=>(<span key={k} style={{display:"flex",alignItems:"center",gap:4,fontSize:11,color:th.text4}}><span style={{width:10,height:10,borderRadius:3,background:v.color,display:"inline-block"}}/>{v.icon} {v.label}</span>))}
      <span style={{display:"flex",alignItems:"center",gap:4,fontSize:11,color:"#FF6B6B"}}>⚠️ Menos de 2 presencial</span>
    </div>

    {/* Grid */}
    <div style={{overflowX:"auto"}}>
      <div style={{minWidth:500}}>
        {/* Day headers */}
        <div style={{display:"grid",gridTemplateColumns:`120px repeat(5,1fr)`,gap:4,marginBottom:4}}>
          <div/>
          {weekData.map(({date})=>{
            const isToday=date===todayStr;
            const d=new Date(date+"T00:00:00");
            const dayName=WEEK_DAYS_ES[d.getDay()-1]||"";
            return(<div key={date} style={{textAlign:"center",padding:"6px 4px",borderRadius:8,background:isToday?dark?"#0D1E35":"#EBF4FF":"transparent",border:isToday?"1px solid #74B9FF55":"1px solid transparent"}}>
              <div style={{fontSize:11,fontWeight:isToday?800:600,color:isToday?"#74B9FF":th.text3}}>{dayName}</div>
              <div style={{fontSize:15,fontWeight:800,color:isToday?"#74B9FF":th.text}}>{d.getDate()}</div>
            </div>);
          })}
        </div>
        {/* Member rows */}
        {(selectedMember?[selectedMember]:CAL_MEMBERS).map(member=>(
          <div key={member} style={{display:"grid",gridTemplateColumns:`120px repeat(5,1fr)`,gap:4,marginBottom:4}}>
            <div style={{display:"flex",alignItems:"center",gap:7,padding:"6px 8px",borderRadius:8,background:th.surface2,border:`1px solid ${th.border2}`}}>
              <div style={{width:24,height:24,borderRadius:99,background:"#74B9FF22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,color:"#74B9FF",flexShrink:0}}>{member[0]}</div>
              <span style={{fontSize:12,fontWeight:600,color:th.text2}}>{member[0]+member.slice(1).toLowerCase()}</span>
            </div>
            {weekData.map(({date,row})=>{
              const val=row?row[member]:"";
              const st=getStatus(val);
              const isEmpty=!val||val==="";
              const isFestivo=val==="F";
              return(<div key={date} style={{padding:"6px 8px",borderRadius:8,background:isEmpty||isFestivo?th.border3:dark?st.bg:st.bgL,border:`1px solid ${isEmpty||isFestivo?th.border2:st.color+"44"}`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:52,gap:2}}>
                {isFestivo?(<span style={{fontSize:14}}>🎉</span>):isEmpty?(<span style={{fontSize:10,color:th.text6}}>—</span>):(<>
                  <span style={{fontSize:16}}>{st.icon}</span>
                  <span style={{fontSize:9,fontWeight:700,color:st.color,textAlign:"center",lineHeight:1.2}}>{val.length>6?val.slice(0,6)+"…":val}</span>
                </>)}
              </div>);
            })}
          </div>
        ))}
        {/* Summary OFICINA row */}
        <div style={{display:"grid",gridTemplateColumns:`120px repeat(5,1fr)`,gap:4,marginTop:6}}>
          <div style={{padding:"6px 8px",display:"flex",alignItems:"center"}}><span style={{fontSize:10,color:"#111",fontWeight:700}}>OFICINA</span></div>
          {weekData.map(({date,row})=>{
            const activeMembers=selectedMember?[selectedMember]:CAL_MEMBERS;
            const allF=activeMembers.every(m=>row?.[m]==="F");
            if(!row||allF)return<div key={date} style={{padding:"4px 6px",borderRadius:8,background:th.border3,border:`1px solid ${th.border2}`}}/>;
            const presCount=activeMembers.filter(m=>{const s=getStatus(row[m]);return s===CAL_STATUS.P||s===CAL_STATUS.PD||s===CAL_STATUS.PARTIDO;}).length;
            const ttCount=activeMembers.filter(m=>getStatus(row[m])===CAL_STATUS.TT).length;
            const vacCount=activeMembers.filter(m=>getStatus(row[m])===CAL_STATUS.V).length;
            const festCount=activeMembers.filter(m=>row[m]==="F").length;
            // Flag if 0 or 1 presencial and not everyone is on festivo
            const lowPresencial=!selectedMember&&!allF&&presCount<2;
            return(<div key={date} style={{padding:"5px 8px",borderRadius:8,background:lowPresencial?dark?"#2A0808":"#FFF0F0":th.border3,border:`1.5px solid ${lowPresencial?"#FF6B6B":th.border2}`,display:"flex",flexDirection:"column",gap:3}}>
              {presCount>0&&<span style={{fontSize:11,fontWeight:700,color:"#111"}}>🏢 {presCount}</span>}
              {ttCount>0&&<span style={{fontSize:11,fontWeight:700,color:"#111"}}>🏠 {ttCount}</span>}
              {vacCount>0&&<span style={{fontSize:11,fontWeight:700,color:"#111"}}>🌴 {vacCount}</span>}
              {lowPresencial&&<span style={{fontSize:9,color:"#FF6B6B",fontWeight:800}}>⚠️ Bajo</span>}
            </div>);
          })}
        </div>
      </div>
    </div>
  </div>);
}

// ── Dashboard ─────────────────────────────────────────────────
function Dashboard({cats,th,dark,onNavigate}){
  const isMtg=(t)=>t==="meeting"||t==="meeting121eq";

  // Per-category stats: for meetings count checklist items, for others count tasks
  const byCategory=cats.filter(c=>c.type!=="personal").map(c=>{
    let done,total;
    if(isMtg(c.type)){
      const items=c.tasks.filter(m=>!m.done).flatMap(m=>m.checklist||[]);
      done=items.filter(i=>i.state==="Completada").length;
      total=items.length;
    } else {
      done=c.tasks.filter(t=>t.done).length;
      total=c.tasks.length;
    }
    return{id:c.id,name:c.name,icon:c.icon,colorIdx:c.colorIdx,type:c.type,done,total,pct:total?Math.round((done/total)*100):0};
  });

  // Global totals exclude personal and meetings (meetings use checklist counts)
  const nonMtgCats=cats.filter(c=>c.type!=="personal");
  const totalDone=cats.filter(c=>c.type!=="personal").reduce((a,c)=>a+c.tasks.filter(t=>t.done).length,0);
  const totalAll=cats.filter(c=>c.type!=="personal").reduce((a,c)=>a+c.tasks.length,0);
  const last30=new Date();last30.setDate(last30.getDate()-30);
  const recentDone=nonMtgCats.flatMap(c=>c.tasks.filter(t=>t.done&&t.completedAt&&new Date(t.completedAt)>=last30));

  

  return(<div style={{marginBottom:28}}>
    <h3 style={{color:th.text,fontSize:14,fontWeight:800,marginBottom:14,marginTop:0}}>📊 Dashboard</h3>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))",gap:10,marginBottom:18}}>
      {[{label:"Completadas",value:totalDone,color:"#6BCB77"},{label:"Completado",value:`${totalAll?Math.round((totalDone/totalAll)*100):0}%`,color:"#4ECDC4"},{label:"Últimos 30d",value:recentDone.length,color:"#FFD93D"},{label:"Pendientes",value:totalAll-totalDone,color:"#FF9F43"}].map((m,i)=>(<div key={i} style={{background:th.cardBg,borderRadius:12,padding:"12px 14px",border:`1px solid ${th.border2}`,boxShadow:dark?"none":"0 1px 6px #0001"}}>
        <div style={{fontSize:22,fontWeight:800,color:m.color,marginBottom:2}}>{m.value}</div>
        <div style={{fontSize:10,color:th.text5}}>{m.label}</div>
      </div>))}
    </div>
    <div style={{background:th.cardBg,borderRadius:14,padding:16,border:`1px solid ${th.border2}`,boxShadow:dark?"none":"0 1px 6px #0001"}}>
      <div style={{fontSize:11,fontWeight:700,color:th.text4,marginBottom:14,letterSpacing:0.5}}>COMPLETADAS POR CATEGORÍA</div>
      {byCategory.map(c=>{const color=gc(COLORS[c.colorIdx],dark);return(
        <div key={c.id} onClick={()=>onNavigate(c.id)} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10,cursor:"pointer"}}>
          <span style={{fontSize:14,flexShrink:0}}>{c.icon}</span>
          <div style={{width:85,fontSize:11,color:th.text3,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",flexShrink:0}}>{c.name}</div>
          <div style={{flex:1,height:8,background:th.border2,borderRadius:99,overflow:"hidden",minWidth:0,position:"relative"}}><div style={{position:"absolute",top:0,left:0,height:8,borderRadius:99,background:color.accent,width:`${c.pct}%`,transition:"width 0.5s"}}/></div>
          <span style={{fontSize:11,color:color.tc,minWidth:36,textAlign:"right",flexShrink:0}}>{c.done}/{c.total}</span>
        </div>
      );})}
    </div>
  </div>);
}

// ── Upcoming groups ───────────────────────────────────────────
function UpcomingGroup({title,tasks,icon,color,th,dark,defaultOpen=false,onNavigate}){
  const [open,setOpen]=useState(defaultOpen);
  if(tasks.length===0)return null;
  return(<div style={{marginBottom:12}}>
    <div onClick={()=>setOpen(o=>!o)} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 10px",borderRadius:10,cursor:"pointer",background:open?color.light:th.border3,border:`1px solid ${open?color.accent+"44":th.border2}`,marginBottom:open?6:0,transition:"all 0.15s"}}>
      <span style={{fontSize:14}}>{icon}</span>
      <span style={{flex:1,fontWeight:700,fontSize:13,color:open?color.tc:th.text3}}>{title}</span>
      <span style={{fontSize:11,color:th.text5,background:th.border2,padding:"1px 8px",borderRadius:99}}>{tasks.length}</span>
      <span style={{color:th.text5,fontSize:12,transform:open?"rotate(180deg)":"none",transition:"transform 0.2s"}}>▾</span>
    </div>
    {open&&tasks.map(t=>{const dl=dlStatus(t.deadline);return(
      <div key={t.id} onClick={()=>onNavigate(t.catId)} style={{display:"flex",alignItems:"center",gap:10,padding:"7px 11px",borderRadius:9,marginBottom:4,background:th.cardBg,border:`1px solid ${th.border2}`,cursor:"pointer"}}
        onMouseEnter={e=>e.currentTarget.style.borderColor=th.border} onMouseLeave={e=>e.currentTarget.style.borderColor=th.border2}>
        <span style={{fontSize:12,flexShrink:0}}>{t.catIcon||icon}</span>
        <span style={{flex:1,color:th.text2,fontSize:12.5,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.text||t.meetingId}</span>
        {t.meetingDate&&<span style={{fontSize:10,color:th.text4,background:th.border2,padding:"2px 7px",borderRadius:99,flexShrink:0}}>📅 {fmt(t.meetingDate)}</span>}
        {!t.meetingDate&&dl&&<span style={{fontSize:11,fontWeight:700,color:dl.color,background:dl.color+"22",padding:"2px 7px",borderRadius:99,flexShrink:0}}>{dl.label}</span>}
      </div>
    );})}
  </div>);
}

// ── Personal category: show only pending tasks ────────────────
// ── Tasks Calendar View ───────────────────────────────────────
function TasksCalendarView({cats,th,dark,onNavigate,personalOnly=false}){
  const todayStr=today();
  const [weekStart,setWeekStart]=useState(getWeekStart(todayStr));

  const weekDates=Array.from({length:5},(_,i)=>addDays(weekStart,i));
  const goWeek=(n)=>setWeekStart(addDays(weekStart,n*7));
  const goToday=()=>setWeekStart(getWeekStart(todayStr));

  // Collect tasks by date based on filter
  const tasksByDate={};
  const sourceCats=personalOnly
    ?cats.filter(c=>c.type==="personal")
    :cats.filter(c=>!c.type||c.type==="tasks"); // only regular task categories, NOT meetings

  sourceCats.forEach(cat=>{
    const color=gc(COLORS[cat.colorIdx],dark);
    cat.tasks.filter(t=>!t.done&&t.deadline).forEach(t=>{
      if(!tasksByDate[t.deadline])tasksByDate[t.deadline]=[];
      tasksByDate[t.deadline].push({...t,catName:cat.name,catIcon:cat.icon,catId:cat.id,catColor:color});
    });
  });

  // For non-personal view: add checklist items with deadlines from meeting categories
  if(!personalOnly){
    cats.filter(c=>c.type==="meeting"||c.type==="meeting121eq").forEach(cat=>{
      const color=gc(COLORS[cat.colorIdx],dark);
      cat.tasks.filter(m=>!m.done).forEach(m=>{
        (m.checklist||[]).filter(i=>i.deadline&&i.state!=="Completada").forEach(i=>{
          if(!tasksByDate[i.deadline])tasksByDate[i.deadline]=[];
          tasksByDate[i.deadline].push({id:i.id,text:i.text,catName:cat.name,catIcon:cat.icon,catId:cat.id,catColor:color,priority:"media",meetingId:m.meetingId});
        });
      });
    });
  }

  const calRow=CAL_DATA.find(r=>weekDates.includes(r.date));
  const semanaLabel=calRow?.semana||`Semana del ${fmtShort(weekStart)}`;

  const allPending=sourceCats.flatMap(c=>c.tasks.filter(t=>!t.done&&t.deadline));
  const overdueTasks=allPending.filter(t=>t.deadline<weekDates[0]);
  const futureTasks=allPending.filter(t=>t.deadline>weekDates[4]);

  const accentColor=personalOnly?"#55EFC4":"#FF6B6B";
  const title=personalOnly?"🌿 Calendario personal":"📌 Calendario de tareas";

  return(<div>
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,flexWrap:"wrap",gap:10}}>
      <div>
        <h2 style={{margin:0,color:th.text,fontSize:18,fontWeight:800}}>{title}</h2>
        <span style={{color:th.text5,fontSize:11}}>{semanaLabel} · {fmtShort(weekStart)} – {fmtShort(addDays(weekStart,4))}</span>
      </div>
      <div style={{display:"flex",gap:6,alignItems:"center"}}>
        <button onClick={()=>goWeek(-1)} style={{padding:"6px 10px",borderRadius:8,border:`1px solid ${th.border}`,background:th.surface,color:th.text3,cursor:"pointer",fontSize:13}}>‹</button>
        <button onClick={goToday} style={{padding:"6px 10px",borderRadius:8,border:`1px solid ${th.border}`,background:th.surface,color:th.text3,cursor:"pointer",fontSize:11}}>Hoy</button>
        <button onClick={()=>goWeek(1)} style={{padding:"6px 10px",borderRadius:8,border:`1px solid ${th.border}`,background:th.surface,color:th.text3,cursor:"pointer",fontSize:13}}>›</button>
      </div>
    </div>

    {overdueTasks.length>0&&(<div style={{marginBottom:16,background:dark?"#2A0808":"#FFF5F5",border:"1px solid #FF6B6B44",borderRadius:12,overflow:"hidden"}}>
      <div style={{padding:"8px 14px",background:"#FF4444",display:"flex",alignItems:"center",gap:8}}>
        <span style={{fontSize:13}}>⚠️</span>
        <span style={{fontSize:12,color:"#fff",fontWeight:800}}>{overdueTasks.length} tarea{overdueTasks.length!==1?"s":""} vencida{overdueTasks.length!==1?"s":""} — semana anterior</span>
      </div>
      <div style={{padding:"8px 10px",display:"flex",flexWrap:"wrap",gap:6}}>
        {overdueTasks.map(t=>{
          const cat=sourceCats.find(c=>c.id===t.catId);
          const color=cat?gc(COLORS[cat.colorIdx],dark):{light:"#fee",accent:"#f44",tc:"#c00"};
          return(<div key={t.id} onClick={()=>onNavigate(t.catId)} style={{padding:"6px 10px",borderRadius:8,background:color.light,border:`1px solid ${color.accent}44`,cursor:"pointer",minWidth:160,maxWidth:280}}>
            <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:2}}>
              <span style={{fontSize:10}}>{t.catIcon}</span>
              <span style={{fontSize:10,color:color.tc,fontWeight:600}}>{t.catName}</span>
              <span style={{fontSize:9,color:"#FF4444",fontWeight:700,marginLeft:"auto"}}>📅 {t.deadline}</span>
            </div>
            <div style={{fontSize:11.5,color:th.text2,lineHeight:1.3}}>{t.text}</div>
          </div>);
        })}
      </div>
    </div>)}

    <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:8}}>
      {weekDates.map(date=>{
        const isToday=date===todayStr;
        const d=new Date(date+"T12:00:00");
        const dayName=WEEK_DAYS_ES[d.getDay()-1]||"";
        const dayTasks=tasksByDate[date]||[];
        return(<div key={date} style={{borderRadius:11,background:isToday?dark?"#0D1E35":"#EBF4FF":th.surface2,border:`1.5px solid ${isToday?"#74B9FF55":th.border2}`,overflow:"hidden"}}>
          <div style={{padding:"8px 10px",borderBottom:`1px solid ${th.border2}`,textAlign:"center",background:isToday?dark?"#0D1E35":"#D8ECFF":"transparent"}}>
            <div style={{fontSize:11,fontWeight:600,color:isToday?"#74B9FF":th.text3}}>{dayName}</div>
            <div style={{fontSize:18,fontWeight:800,color:isToday?"#74B9FF":th.text}}>{d.getDate()}</div>
            {dayTasks.length>0&&<div style={{fontSize:10,fontWeight:700,color:th.text5}}>{dayTasks.length} elemento{dayTasks.length!==1?"s":""}</div>}
          </div>
          <div style={{padding:"6px",minHeight:80}}>
            {dayTasks.length===0?(<div style={{textAlign:"center",paddingTop:20,color:th.text6,fontSize:11}}>—</div>):(
              dayTasks.map(t=>(<div key={t.id} onClick={()=>onNavigate(t.catId)} style={{marginBottom:5,padding:"5px 8px",borderRadius:7,background:t.catColor.light,border:`1px solid ${t.catColor.accent}33`,cursor:"pointer",transition:"opacity 0.15s"}}
                onMouseEnter={e=>e.currentTarget.style.opacity="0.8"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:2}}>
                  <span style={{fontSize:11}}>{t.catIcon}</span>
                  <span style={{fontSize:10,color:t.catColor.tc,fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.catName}</span>
                </div>
                <div style={{display:"flex",alignItems:"flex-start",gap:4}}>
                  {t.taskKind&&t.taskKind!=="tarea"&&<span style={{fontSize:9,padding:"1px 6px",borderRadius:99,fontWeight:700,flexShrink:0,background:TASK_KIND[t.taskKind]?.bg,color:TASK_KIND[t.taskKind]?.color,border:`1px solid ${TASK_KIND[t.taskKind]?.color}44`}}>{TASK_KIND[t.taskKind]?.label}</span>}
                  {t.priority&&<span style={{fontSize:9,marginTop:2,flexShrink:0}}>{PRIORITY[t.priority]?.dot}</span>}
                  <div style={{fontSize:11.5,color:th.text2,lineHeight:1.3,overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"}}>{t.text}</div>
                </div>
              </div>))
            )}
          </div>
        </div>);
      })}
    </div>

    {futureTasks.length>0&&(<div style={{marginTop:14,padding:"8px 12px",borderRadius:9,background:th.surface2,border:`1px solid ${th.border2}`}}>
      <span style={{fontSize:11,color:th.text5}}>📅 <strong style={{color:th.text4}}>{futureTasks.length}</strong> tarea{futureTasks.length!==1?"s":""} con deadline en semanas posteriores</span>
    </div>)}
  </div>);
}

function PersonalView({cat,th,dark,calData,onToggle,onDelete,onUpdate,onAddTask,labelBank=[],onLabelBankChange=()=>{}}){
  const color=gc(COLORS[cat.colorIdx],dark);
  const [nText,setNText]=useState("");const [nDl,setNDl]=useState("");const [nPri,setNPri]=useState("media");
  const [nKind,setNKind]=useState("tarea");
  const [weekStart,setWeekStart]=useState(getWeekStart(today()));
  const pend=cat.tasks.filter(t=>!t.done);
  const data=calData||CAL_DATA;

  const addTask=()=>{
    if(!nText.trim())return;
    onAddTask({id:genId(),text:nText.trim(),done:false,taskKind:nKind,priority:nPri,createdAt:today(),deadline:nDl||null,completedAt:null,jiraUrl:"",description:"",checklist:[],contacts:[],labels:[]});
    setNText("");setNDl("");
  };

  const todayStr=today();
  const weekDates=Array.from({length:5},(_,i)=>addDays(weekStart,i));
  const weekData=weekDates.map(date=>({date,row:(data.find(r=>r.date===date)||null)}));
  const calRow=data.find(r=>weekDates.includes(r.date));
  const semanaLabel=calRow?.semana||"";
  const goWeek=(n)=>setWeekStart(addDays(weekStart,n*7));

  return(<div>
    {/* ── Section: Tareas personales ── */}
    <div style={{marginBottom:0}}>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
        <div style={{width:40,height:40,borderRadius:11,background:color.light,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{cat.icon}</div>
        <div>
          <h2 style={{margin:0,color:th.text,fontSize:18,fontWeight:800}}>{cat.name}</h2>
          <span style={{color:th.text5,fontSize:11}}>{pend.length} pendiente{pend.length!==1?"s":""} · solo se muestran tareas activas</span>
        </div>
      </div>
      <div style={{background:th.surface2,borderRadius:12,padding:12,marginBottom:12,border:`1px solid ${th.border2}`}}>
        <div style={{display:"flex",gap:7,marginBottom:8}}>
          <input value={nText} onChange={e=>setNText(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addTask()} placeholder="Nueva tarea personal..." style={{...inp(th),flex:1}}/>
          <button onClick={addTask} style={{padding:"8px 14px",borderRadius:8,background:color.bg,border:"none",color:"#fff",fontWeight:800,fontSize:13,cursor:"pointer"}}>＋</button>
        </div>
        <div style={{display:"flex",gap:7,flexWrap:"wrap",alignItems:"center"}}>
          <input type="date" value={nDl} onChange={e=>setNDl(e.target.value)} style={{...inp(th,{fontSize:11.5,padding:"4px 8px",colorScheme:dark?"dark":"light"})}}/>
          {Object.entries(PRIORITY).map(([k])=>(<button key={k} onClick={()=>setNPri(k)} style={{padding:"3px 10px",borderRadius:99,fontSize:11.5,cursor:"pointer",...ps(k,nPri===k,dark)}}>{PRIORITY[k].dot} {PRIORITY[k].label}</button>))}
          <span style={{color:th.border,margin:"0 4px"}}>|</span>
          {Object.entries(TASK_KIND).map(([k,v])=>(<button key={k} onClick={()=>setNKind(k)} style={{padding:"3px 10px",borderRadius:99,fontSize:11,cursor:"pointer",fontWeight:nKind===k?700:400,background:nKind===k?v.bg:"transparent",color:nKind===k?v.color:th.text5,border:`1px solid ${nKind===k?v.color+"66":"transparent"}`}}>{v.label}</button>))}
        </div>
      </div>
      {pend.length===0?(
        <div style={{textAlign:"center",padding:"20px 0 10px",color:th.text6}}>
          <div style={{fontSize:26,marginBottom:4}}>✨</div>
          <div style={{fontSize:13,fontWeight:700,color:th.text4}}>¡Todo al día!</div>
          <div style={{fontSize:11,marginTop:3}}>No hay tareas personales pendientes</div>
        </div>
      ):(
        pend.map(t=>(<TaskRow key={t.id} task={t} color={color} th={th} onToggle={()=>onToggle(t.id)} onDelete={()=>onDelete(t.id)} onUpdate={p=>onUpdate(t.id,p)} labelBank={labelBank} onLabelBankChange={onLabelBankChange}/>))
      )}
    </div>

    {/* ── Section divider ── */}
    <div style={{display:"flex",alignItems:"center",gap:12,margin:"22px 0 16px"}}>
      <div style={{flex:1,height:1,background:th.border2}}/>
      <span style={{fontSize:11,fontWeight:700,color:th.text5,letterSpacing:1,textTransform:"uppercase",whiteSpace:"nowrap"}}>🌿 Tareas por semana</span>
      <div style={{flex:1,height:1,background:th.border2}}/>
    </div>

    {/* ── Section: Personal tasks calendar ── */}
    <div style={{background:th.surface2,borderRadius:14,padding:14,border:`1px solid ${th.border2}`}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
        <span style={{color:th.text5,fontSize:11}}>{semanaLabel} · {fmtShort(weekStart)} – {fmtShort(addDays(weekStart,4))}</span>
        <div style={{display:"flex",gap:5}}>
          <button onClick={()=>goWeek(-1)} style={{padding:"4px 9px",borderRadius:7,border:`1px solid ${th.border}`,background:th.surface,color:th.text3,cursor:"pointer",fontSize:12}}>‹</button>
          <button onClick={()=>setWeekStart(getWeekStart(todayStr))} style={{padding:"4px 8px",borderRadius:7,border:`1px solid ${th.border}`,background:th.surface,color:th.text3,cursor:"pointer",fontSize:10}}>Hoy</button>
          <button onClick={()=>goWeek(1)} style={{padding:"4px 9px",borderRadius:7,border:`1px solid ${th.border}`,background:th.surface,color:th.text3,cursor:"pointer",fontSize:12}}>›</button>
        </div>
      </div>
      {/* Week columns */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:6}}>
        {weekDates.map(date=>{
          const isToday=date===todayStr;
          const d=new Date(date+"T12:00:00");
          const dayName=WEEK_DAYS_ES[d.getDay()-1]||"";
          const dayTasks=cat.tasks.filter(t=>!t.done&&t.deadline===date);
          return(<div key={date} style={{borderRadius:9,background:isToday?dark?"#0D2A1A":"#EDFAEF":th.surface,border:`1.5px solid ${isToday?color.accent+"66":th.border2}`,overflow:"hidden"}}>
            <div style={{padding:"6px 8px",borderBottom:`1px solid ${th.border2}`,textAlign:"center",background:isToday?color.light:"transparent"}}>
              <div style={{fontSize:10,fontWeight:600,color:isToday?color.tc:th.text3}}>{dayName}</div>
              <div style={{fontSize:15,fontWeight:800,color:isToday?color.tc:th.text}}>{d.getDate()}</div>
              {dayTasks.length>0&&<div style={{fontSize:9,color:color.tc,fontWeight:700}}>{dayTasks.length}</div>}
            </div>
            <div style={{padding:"5px",minHeight:50}}>
              {dayTasks.length===0
                ?<div style={{textAlign:"center",paddingTop:10,color:th.text6,fontSize:10}}>—</div>
                :dayTasks.map(t=>{const p=PRIORITY[t.priority];return(
                  <div key={t.id} style={{marginBottom:4,padding:"4px 6px",borderRadius:6,background:color.light,border:`1px solid ${color.accent}33`}}>
                    <div style={{display:"flex",alignItems:"center",gap:4,marginBottom:2}}><span style={{fontSize:9}}>{p?.dot}</span><div style={{fontSize:11,color:th.text2,lineHeight:1.3,overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"}}>{t.text}</div></div>
                  </div>
                );})}
            </div>
          </div>);
        })}
      </div>
      {/* Overdue/future hints */}
      {(()=>{
        const over=pend.filter(t=>t.deadline&&t.deadline<weekDates[0]);
        const fut=pend.filter(t=>t.deadline&&t.deadline>weekDates[4]);
        return(<>
          {over.length>0&&<div style={{marginTop:8,fontSize:10,color:"#FF6B6B"}}>⚠️ {over.length} tarea{over.length!==1?"s":""} vencida{over.length!==1?"s":""}</div>}
          {fut.length>0&&<div style={{marginTop:4,fontSize:10,color:th.text5}}>📅 {fut.length} tarea{fut.length!==1?"s":""} en semanas posteriores</div>}
        </>);
      })()}
    </div>
  </div>);
}

// ── Main App ───────────────────────────────────────────────────

// ── KPI Tab ──────────────────────────────────────────────────
const FIRMES_DEFAULT_TABLES=[
  {
    id:"firmes-cap",
    name:"Capacidad semanal FIRMES",
    columns:["SEMANA","NO BLOQ","BLOQ","ALMACENADAS -2SEM","TOTAL AGREGADO"],
    graphCols:[1,2,3,4],
    objectives:{2:1000,3:5000},
    chartType:"bar",
    rows:[
      ["S36","27291","3526","8717","30817"],
      ["S37","27553","2950","15396","30503"],
      ["S38","34078","2591","16476","36669"],
      ["S41","27192","3229","12432","30421"],
      ["S42","30931","2654","8916","33585"],
      ["S43","26885","2089","7939","28974"],
      ["S44","23213","1919","10183","25132"],
      ["S48","30649","2843","8479","33492"],
      ["S49","22131","2760","10669","24891"],
      ["S50","20206","2422","8610","22628"],
      ["S52","27769","2149","5686","29918"],
      ["S01","33592","1915","8577","35507"],
      ["S03","22922","1900","14830","24822"],
      ["S04","21272","1958","8795","23230"],
      ["S05","24735","2222","7082","26957"]
    ]
  },
  {
    id:"firmes-dias",
    name:"Tiempo medio en almacen",
    columns:["MES","DIAS MEDIOS"],
    graphCols:[1],
    objectives:{},
    chartType:"line",
    rows:[["",""]]
  }
];

const BAR_COLORS=["#2E5FA3","#E07B39","#6BCB77","#9966FF","#FF6B6B","#4ECDC4"];

function EditableName({value,onChange,color,fontSize=13}){
  const [editing,setEditing]=useState(false);
  const [v,setV]=useState(value);
  if(editing)return(
    <input autoFocus value={v}
      onChange={e=>setV(e.target.value)}
      onBlur={()=>{onChange(v);setEditing(false);}}
      onKeyDown={e=>e.key==="Enter"&&(onChange(v),setEditing(false))}
      style={{fontSize,fontWeight:800,color,background:"transparent",border:"none",borderBottom:"2px solid "+color,outline:"none",minWidth:120,padding:"1px 2px"}}/>
  );
  return(
    <div onClick={()=>setEditing(true)} style={{display:"flex",alignItems:"center",gap:5,cursor:"pointer"}} title="Click para editar">
      <span style={{fontSize,fontWeight:800,color}}>{value}</span>
      <span style={{fontSize:10,color:color+"88"}}>✏️</span>
    </div>
  );
}

function KPIChart({table,th,dark}){
  const [tooltip,setTooltip]=useState(null);
  const data=table.rows.filter(r=>r[0]).map(r=>{
    const obj={name:r[0]};
    (table.graphCols||[]).forEach(ci=>{
      const raw=(r[ci]||"0").replace(/\./g,"").replace(",",".");
      obj[table.columns[ci]]=parseFloat(raw)||0;
    });
    return obj;
  });
  if(data.length===0)return null;

  const isLine=table.chartType==="line";
  const cols=(table.graphCols||[]).map(ci=>table.columns[ci]);
  const COLORS=["#2E5FA3","#E07B39","#6BCB77","#9966FF","#FF6B6B","#4ECDC4"];
  const W=820,H=320,PAD={top:24,right:200,bottom:52,left:65};
  const innerW=W-PAD.left-PAD.right;
  const innerH=H-PAD.top-PAD.bottom;

  // Compute max value
  const allVals=data.flatMap(d=>cols.map(c=>d[c]||0));
  const objVals=Object.values(table.objectives||{}).map(v=>parseFloat(v)||0);
  const maxVal=Math.max(...allVals,...objVals,1);
  const yScale=v=>(innerH-(v/maxVal)*innerH);
  const fmtY=v=>v>=1000?(v/1000).toFixed(0)+"k":v;
  const fmtNum=v=>v>=1000?v.toLocaleString("es-ES"):v;

  // Y axis ticks
  const yTicks=[0,0.25,0.5,0.75,1].map(f=>Math.round(maxVal*f));

  const barW=isLine?0:Math.max(4,Math.floor(innerW/data.length/cols.length)-2);
  const xStep=innerW/data.length;

  const bg=dark?"#1A2535":"#fff";
  const gridC=dark?"#2A3548":"#E8EEF8";
  const textC=dark?"#8899BB":"#7A8AA0";

  return(
    <div style={{overflowX:"auto",width:"100%"}}>
      <svg width={W} height={H} style={{display:"block",margin:"0 auto",maxWidth:"100%",fontFamily:"inherit"}}>
        <rect width={W} height={H} fill={bg} rx={8}/>
        {/* Y grid + labels */}
        {yTicks.map((v,i)=>{
          const y=PAD.top+yScale(v);
          return(<g key={i}>
            <line x1={PAD.left} x2={PAD.left+innerW} y1={y} y2={y} stroke={gridC} strokeWidth={1}/>
            <text x={PAD.left-6} y={y+4} textAnchor="end" fontSize={9} fill={textC}>{fmtY(v)}</text>
          </g>);
        })}
        {/* Objective lines */}
        {Object.entries(table.objectives||{}).map(([ci,objV])=>{
          if(!objV)return null;
          const y=PAD.top+yScale(parseFloat(objV));
          const col=table.columns[parseInt(ci)];
          const lbl2="Obj "+col+": "+parseFloat(objV).toLocaleString("es-ES");
          return(<g key={"obj"+ci}>
            <line x1={PAD.left} x2={PAD.left+innerW} y1={y} y2={y} stroke="#FF4444" strokeWidth={1.5} strokeDasharray="6,3"/>
            <line x1={PAD.left+innerW} x2={PAD.left+innerW+8} y1={y} y2={y} stroke="#FF4444" strokeWidth={1.5}/>
            <rect x={PAD.left+innerW+10} y={y-9} width={162} height={18} rx={4} fill={"#FF444415"} stroke="#FF4444" strokeWidth={1}/>
            <text x={PAD.left+innerW+16} y={y+4} textAnchor="start" fontSize={10} fontWeight={700} fill="#FF4444">{lbl2}</text>
          </g>);
        })}
        {/* Bars or Lines */}
        {isLine?(
          cols.map((col,ci)=>{
            const pts=data.map((d,i)=>{
              const x=PAD.left+i*xStep+xStep/2;
              const y=PAD.top+yScale(d[col]||0);
              return x+","+y;
            }).join(" ");
            return(<g key={ci}>
              <polyline points={pts} fill="none" stroke={COLORS[ci%COLORS.length]} strokeWidth={2.5}/>
              {data.map((d,i)=>{
                const x=PAD.left+i*xStep+xStep/2;
                const y=PAD.top+yScale(d[col]||0);
                return<circle key={i} cx={x} cy={y} r={4} fill={COLORS[ci%COLORS.length]}
                onMouseEnter={()=>setTooltip({x,y:y-8,val:d[col],col,label:d.name})}
                onMouseLeave={()=>setTooltip(null)}
                style={{cursor:"default"}}/>;
              })}
            </g>);
          })
        ):(
          data.map((d,i)=>{
            const groupW=cols.length*(barW+2);
            const groupX=PAD.left+i*xStep+(xStep-groupW)/2;
            return(<g key={i}>
              {cols.map((col,ci)=>{
                const val=d[col]||0;
                const bh=(val/maxVal)*innerH;
                const bx=groupX+ci*(barW+2);
                const by=PAD.top+innerH-bh;
                return(<g key={ci}>
                  <rect x={bx} y={by} width={barW} height={bh} fill={COLORS[ci%COLORS.length]} rx={2}
                    onMouseEnter={()=>setTooltip({x:bx+barW/2,y:by,val,col,label:d.name})}
                    onMouseLeave={()=>setTooltip(null)}
                    style={{cursor:"default"}}/>
                </g>);
              })}
            </g>);
          })
        )}
        {/* X labels */}
        {data.map((d,i)=>{
          const x=PAD.left+i*xStep+xStep/2;
          return<text key={i} x={x} y={H-PAD.bottom+14} textAnchor="middle" fontSize={9} fill={textC}>{d.name}</text>;
        })}
        {/* Legend */}
        {cols.map((col,ci)=>{
          const lx=PAD.left+ci*120;
          return(<g key={ci} transform={"translate("+lx+","+(H-10)+")"}>
            {isLine
              ?<line x1={0} x2={14} y1={0} y2={0} stroke={COLORS[ci%COLORS.length]} strokeWidth={2.5}/>
              :<rect x={0} y={-6} width={10} height={10} fill={COLORS[ci%COLORS.length]} rx={2}/>}
            <text x={isLine?18:14} y={4} fontSize={9} fill={textC}>{col}</text>
          </g>);
        })}
        {tooltip&&(()=>{
          const lbl=Number.isFinite(tooltip.val)?tooltip.val.toLocaleString("es-ES"):String(tooltip.val||"");
          const full=tooltip.label+" · "+tooltip.col+": "+lbl;
          const tw=full.length*6.2+16;
          const tx=Math.min(Math.max(tooltip.x-tw/2,PAD.left),W-PAD.right-tw);
          const ty=Math.max(tooltip.y-30,8);
          return(<g key="tooltip">
            <rect x={tx-2} y={ty} width={tw+4} height={22} rx={5} fill={dark?"#1A2535":"#1A3A6E"} opacity={0.93}/>
            <text x={tx+tw/2} y={ty+14} textAnchor="middle" fontSize={10} fontWeight={700} fill="#fff">{full}</text>
          </g>);
        })()}
      </svg>
    </div>
  );
}


function importCSV(e,table,onUpdate){
  const file=e.target.files[0];
  if(!file)return;
  e.target.value="";
  const reader=new FileReader();
  reader.onload=ev=>{
    try{
      const text=ev.target.result;
      const lines=text.split(/\r?\n/).filter(l=>l.trim());
      if(lines.length<2)return;
      // Detect separator (comma or semicolon or tab)
      const sep=lines[0].includes("\t")?"\t":lines[0].includes(";")?";":",";
      const headers=lines[0].split(sep).map(h=>h.trim().replace(/^"|"$/g,""));
      const rows=lines.slice(1).map(l=>{
        const cells=l.split(sep).map(c=>c.trim().replace(/^"|"$/g,""));
        // Pad or trim to match column count
        while(cells.length<table.columns.length)cells.push("");
        return cells.slice(0,table.columns.length);
      }).filter(r=>r.some(c=>c));
      onUpdate({...table,rows});
    }catch(err){alert("Error al leer el archivo: "+err.message);}
  };
  reader.readAsText(file,"UTF-8");
}

function KPITableEditor({table,th,onUpdate,onDelete}){
  const [editCell,setEditCell]=useState(null);
  const [editObj,setEditObj]=useState(false);
  const [showGraph,setShowGraph]=useState(true);
  const dark=th.bg===DARK.bg;
  const cardBg=dark?"#1A2535":"#fff";
  const updateCell=(ri,ci,val)=>onUpdate({...table,rows:table.rows.map((r,ridx)=>ridx!==ri?r:r.map((c,cidx)=>cidx!==ci?c:val))});
  const addRow=()=>onUpdate({...table,rows:[...table.rows,Array(table.columns.length).fill("")]});
  const delRow=(ri)=>onUpdate({...table,rows:table.rows.filter((_,i)=>i!==ri)});
  const setObj=(ci,val)=>{
    const next={...table,objectives:{...(table.objectives||{})}};
    if(val==="")delete next.objectives[ci]; else next.objectives[ci]=parseFloat(val)||0;
    onUpdate(next);
  };
  return(
    <div style={{background:cardBg,borderRadius:14,border:"1px solid "+th.border2,overflow:"hidden",marginBottom:20}}>
      <div style={{padding:"12px 16px",borderBottom:"1px solid "+th.border2,display:"flex",justifyContent:"space-between",alignItems:"center",background:dark?"#151D2B":"#EEF3FB",flexWrap:"wrap",gap:8}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <EditableName value={table.name} onChange={n=>onUpdate({...table,name:n})} color="#1A3A6E" fontSize={13}/>
          <div style={{fontSize:11,color:th.text5,marginTop:2}}>{table.rows.filter(r=>r[0]).length} entradas</div>
        </div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          <button onClick={()=>setEditObj(o=>!o)} style={{padding:"5px 10px",borderRadius:7,fontSize:11,fontWeight:600,border:"1px solid "+th.border2,background:"transparent",color:th.text4,cursor:"pointer"}}>Objetivos</button>
          <button onClick={()=>setShowGraph(g=>!g)} style={{padding:"5px 10px",borderRadius:7,fontSize:11,fontWeight:600,border:"1px solid "+th.border2,background:"transparent",color:th.text4,cursor:"pointer"}}>{showGraph?"Ver tabla":"Ver gráfico"}</button>
          <label style={{padding:"5px 10px",borderRadius:7,fontSize:11,fontWeight:700,border:"1px solid #6BCB7766",background:dark?"#0F2215":"#EDFAEF",color:"#2A7A34",cursor:"pointer"}} title="Importar desde CSV/Excel">
            ⬆ CSV
            <input type="file" accept=".csv,.xlsx,.xls" style={{display:"none"}} onChange={e=>importCSV(e,table,onUpdate)}/>
          </label>
          <button onClick={addRow} style={{padding:"5px 10px",borderRadius:7,fontSize:11,fontWeight:700,border:"1px solid #1A3A6E44",background:dark?"#0D1E35":"#E8EEF8",color:"#1A3A6E",cursor:"pointer"}}>＋ Fila</button>
          <button onClick={()=>table.rows.length>0&&onUpdate({...table,rows:table.rows.slice(0,-1)})} style={{padding:"5px 10px",borderRadius:7,fontSize:11,border:"1px solid #FF6B6B44",background:"transparent",color:table.rows.length===0?"#ccc":"#FF6B6B",cursor:table.rows.length===0?"default":"pointer"}}>− Fila</button>
          <button onClick={onDelete} style={{padding:"5px 8px",borderRadius:7,fontSize:11,border:"1px solid #ccc",background:"transparent",color:"#aaa",cursor:"pointer"}} title="Eliminar tabla completa">🗑</button>
        </div>
      </div>
      {editObj&&(
        <div style={{padding:"12px 16px",borderBottom:"1px solid "+th.border2,background:dark?"#111827":"#FAFCFF"}}>
          <div style={{fontSize:10,fontWeight:700,color:"#1A3A6E",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>Objetivos (lineas en el grafico)</div>
          <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
            {table.columns.slice(1).map((col,i)=>{
              const ci=i+1;
              return(
                <div key={ci} style={{display:"flex",alignItems:"center",gap:6}}>
                  <span style={{fontSize:11,color:th.text4,fontWeight:600}}>{col}:</span>
                  <input type="number" value={(table.objectives&&table.objectives[ci])||""} onChange={e=>setObj(ci,e.target.value)}
                    placeholder="Sin objetivo"
                    style={{width:90,padding:"4px 8px",borderRadius:6,border:"1px solid "+th.border2,background:th.surface,color:th.text,fontSize:11,outline:"none"}}/>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {showGraph&&table.graphCols&&table.graphCols.length>0&&(
        <div style={{padding:"16px 16px 8px"}}>
          <KPIChart table={table} th={th} dark={dark}/>
        </div>
      )}
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead>
            <tr style={{background:dark?"#151D2B":"#EEF3FB"}}>
              {table.columns.map((col,ci)=>(
                <th key={ci} style={{padding:"8px 12px",textAlign:ci===0?"left":"right",fontSize:11,fontWeight:700,color:"#1A3A6E",borderBottom:"1px solid "+th.border2,whiteSpace:"nowrap",position:"relative"}}>
                  <span style={{display:"flex",alignItems:"center",justifyContent:ci===0?"flex-start":"flex-end",gap:4}}>
                    {col}
                    {ci>0&&<span onClick={()=>{
                      const next={...table,
                        columns:table.columns.filter((_,i)=>i!==ci),
                        graphCols:(table.graphCols||[]).filter(g=>g!==ci).map(g=>g>ci?g-1:g),
                        objectives:Object.fromEntries(Object.entries(table.objectives||{}).filter(([k])=>parseInt(k)!==ci).map(([k,v])=>[parseInt(k)>ci?parseInt(k)-1:k,v])),
                        rows:table.rows.map(r=>r.filter((_,i)=>i!==ci))
                      };
                      onUpdate(next);
                    }} style={{cursor:"pointer",opacity:0.4,fontSize:10,lineHeight:1}} title="Eliminar columna">✕</span>}
                  </span>
                </th>
              ))}
              <th style={{width:32,borderBottom:"1px solid "+th.border2}}/>
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row,ri)=>(
              <tr key={ri} style={{background:ri%2===0?cardBg:dark?"#151D2B":"#FAFCFF"}}>
                {row.map((cell,ci)=>(
                  <td key={ci} style={{padding:"2px 4px",borderBottom:"1px solid "+th.border2,textAlign:ci===0?"left":"right"}}>
                    {editCell&&editCell.ri===ri&&editCell.ci===ci?(
                      <input autoFocus value={cell} onChange={e=>updateCell(ri,ci,e.target.value)}
                        onBlur={()=>setEditCell(null)} onKeyDown={e=>e.key==="Enter"&&setEditCell(null)}
                        style={{width:"100%",padding:"5px 8px",border:"1.5px solid #2E5FA3",borderRadius:6,fontSize:12,fontWeight:ci===0?700:400,color:th.text,outline:"none",background:dark?"#1A2535":"#F0F5FF",textAlign:ci===0?"left":"right"}}/>
                    ):(
                      <div onClick={()=>setEditCell({ri,ci})} style={{padding:"6px 8px",borderRadius:6,cursor:"text",fontSize:12,fontWeight:ci===0?700:400,color:ci===0?"#1A3A6E":th.text,minWidth:50}}>
                        {(()=>{
                          if(!cell)return<span style={{color:th.border}}>--</span>;
                          if(editCell&&editCell.ri===ri&&editCell.ci===ci)return cell;
                          const n=parseFloat((cell||"").replace(/[.]/g,"").replace(",","."));
                          return(ci>0&&!isNaN(n)&&cell.trim()!=="")
                            ?n.toLocaleString("es-ES")
                            :cell;
                        })()}
                      </div>
                    )}
                  </td>
                ))}
                <td style={{padding:"0 8px",borderBottom:"1px solid "+th.border2,textAlign:"center"}}>
                  <span onClick={()=>delRow(ri)} style={{color:th.border,cursor:"pointer",fontSize:13}}>x</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function KPITab({th,dark,labelBank}){
  const loadKPIs=(proj)=>{
    try{
      const v=localStorage.getItem("mdt_kpis_"+proj);
      if(!v)return null;
      const parsed=JSON.parse(v);
      // Normalize: ensure rows have consistent length with columns
      return parsed.map(t=>({...t,rows:(t.rows||[]).map(r=>{
        const cols=t.columns||[];
        while(r.length<cols.length)r=[...r,""];
        return r.slice(0,cols.length);
      })}));
    }catch{return null;}
  };
  const saveKPIs=(proj,tbls)=>{try{localStorage.setItem("mdt_kpis_"+proj,JSON.stringify(tbls));}catch{}};

  const builtinProjects=[{text:"Estandarización FIRMES",color:"#2E5FA3",id:"builtin-firmes"}];
  const extraProjects=(labelBank||[]).filter(l=>l.text!=="Estandarización FIRMES");
  const allProjects=[...builtinProjects,...extraProjects];

  const initTables=(proj)=>{
    let saved=loadKPIs(proj);
    if(proj==="Estandarización FIRMES"){
      if(!saved||saved.length===0){
        saved=JSON.parse(JSON.stringify(FIRMES_DEFAULT_TABLES));
        saveKPIs(proj,saved);
      } else if(!saved.find(t=>t.id==="firmes-cap")){
        // Re-add capacidad table if missing
        saved=[JSON.parse(JSON.stringify(FIRMES_DEFAULT_TABLES[0])),...saved];
        saveKPIs(proj,saved);
      }
    }
    return saved||[];
  };

  const [selProj,setSelProj]=useState("Estandarización FIRMES");
  const [tables,setTables]=useState(()=>initTables("Estandarización FIRMES"));
  const [addingTable,setAddingTable]=useState(false);
  const [newName,setNewName]=useState("");
  const [newCols,setNewCols]=useState("");
  const [newChartType,setNewChartType]=useState("bar");
  const [addingProject,setAddingProject]=useState(false);
  const [newProjName,setNewProjName]=useState("");
  const [newProjColor,setNewProjColor]=useState("#6BCB77");

  const selectProject=(proj)=>{
    setSelProj(proj);
    setTables(initTables(proj));
  };
  const updateTable=(idx,updated)=>{
    const next=tables.map((t,i)=>i===idx?updated:t);
    setTables(next);saveKPIs(selProj,next);
  };
  const deleteTable=(idx)=>{
    const next=tables.filter((_,i)=>i!==idx);
    setTables(next);saveKPIs(selProj,next);
  };
  const createTable=()=>{
    if(!newName.trim()||!newCols.trim())return;
    const allCols=newCols.split(",").map(x=>x.trim()).filter(Boolean);
    const graphCols=allCols.slice(1).map((_,i)=>i+1);
    const newT={id:genId(),name:newName.trim(),columns:allCols,graphCols,objectives:{},rows:[],chartType:newChartType};
    const next=[...tables,newT];
    setTables(next);saveKPIs(selProj,next);
    setAddingTable(false);setNewName("");setNewCols("");
  };

  const cardBg=dark?"#1A2535":"#fff";

  return(
    <div style={{padding:"20px 0"}}>
      <div style={{marginBottom:20}}>
        <h2 style={{color:th.text,fontSize:18,fontWeight:800,margin:0}}>KPIs</h2>
        <p style={{color:th.text5,fontSize:11,margin:"3px 0 0"}}>Métricas por proyecto</p>
      </div>

      <div style={{display:"flex",gap:6,marginBottom:addingProject?8:20,flexWrap:"wrap",alignItems:"center"}}>
        {allProjects.map(lb=>(
          <button key={lb.text} onClick={()=>selectProject(lb.text)} style={{padding:"7px 16px",borderRadius:99,fontSize:12,fontWeight:700,cursor:"pointer",
            border:"1.5px solid "+(selProj===lb.text?lb.color:lb.color+"44"),
            background:selProj===lb.text?lb.color+"22":"transparent",
            color:selProj===lb.text?lb.color:th.text5}}>
            {lb.text}
          </button>
        ))}
        <button onClick={()=>{setAddingProject(p=>!p);setNewProjName("");}}
          title="Añadir proyecto KPI"
          style={{width:30,height:30,borderRadius:99,border:`1.5px dashed ${th.border}`,background:"transparent",
            color:th.text4,fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",lineHeight:1,flexShrink:0}}>
          +
        </button>
      </div>
      {addingProject&&(()=>{
        const available=(labelBank||[]).filter(l=>!allProjects.find(p=>p.text===l.text));
        return(<div style={{marginBottom:20,padding:"10px 14px",background:th.surface2,borderRadius:10,border:`1px solid ${th.border2}`}}>
          {available.length===0
            ?<span style={{fontSize:12,color:th.text5}}>No hay más proyectos disponibles. Crea etiquetas de proyecto en las tareas primero.</span>
            :<div style={{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
              <span style={{fontSize:11,color:th.text5,fontWeight:700,marginRight:4}}>Selecciona proyecto:</span>
              {available.map(lb=>(
                <button key={lb.text} onClick={()=>{
                  localStorage.setItem("mdt_kpis_"+lb.text,JSON.stringify([]));
                  selectProject(lb.text);
                  setAddingProject(false);
                }} style={{padding:"5px 14px",borderRadius:99,fontSize:12,fontWeight:700,cursor:"pointer",
                  border:`1.5px solid ${lb.color}`,background:lb.color+"22",color:lb.color}}>
                  {lb.text}
                </button>
              ))}
              <button onClick={()=>setAddingProject(false)}
                style={{padding:"5px 10px",borderRadius:7,background:th.border,border:"none",color:th.text4,fontSize:12,cursor:"pointer",marginLeft:4}}>✕</button>
            </div>
          }
        </div>);
      })()}

      {tables.map((t,i)=>(
        <KPITableEditor key={t.id||i} table={t} th={th} onUpdate={u=>updateTable(i,u)} onDelete={()=>deleteTable(i)}/>
      ))}
      {tables.length===0&&!addingTable&&(
        <div style={{textAlign:"center",padding:"40px 20px",color:th.text5,background:cardBg,borderRadius:14,border:"1px dashed "+th.border,marginBottom:16}}>
          <div style={{fontSize:12}}>No hay tablas KPI para este proyecto aún.</div>
        </div>
      )}

      {addingTable?(
        <div style={{background:cardBg,borderRadius:12,border:"1px solid "+th.border2,padding:"16px 18px",marginBottom:16}}>
          <div style={{fontSize:11,fontWeight:700,color:"#1A3A6E",textTransform:"uppercase",letterSpacing:1,marginBottom:12}}>Nueva tabla KPI</div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            <input value={newName} onChange={e=>setNewName(e.target.value)} placeholder="Nombre (ej: Tiempo medio almacén)"
              style={{padding:"8px 12px",borderRadius:8,border:"1px solid "+th.border2,background:th.surface,color:th.text,fontSize:12,outline:"none"}}/>
            <input value={newCols} onChange={e=>setNewCols(e.target.value)} placeholder="Columnas: PERIODO, Métrica1, Métrica2 (separadas por coma)"
              style={{padding:"8px 12px",borderRadius:8,border:"1px solid "+th.border2,background:th.surface,color:th.text,fontSize:12,outline:"none"}}/>
            <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
              <span style={{fontSize:11,color:th.text5}}>Gráfico:</span>
              {["bar","line"].map(tp=>(
                <button key={tp} onClick={()=>setNewChartType(tp)} style={{padding:"5px 12px",borderRadius:7,fontSize:11,fontWeight:600,cursor:"pointer",
                  border:"1.5px solid "+(newChartType===tp?"#1A3A6E":th.border),
                  background:newChartType===tp?"#E8EEF8":"transparent",color:newChartType===tp?"#1A3A6E":th.text4}}>
                  {tp==="bar"?"Barras":"Línea"}
                </button>
              ))}
            </div>
            <div style={{display:"flex",gap:8}}>
              <button onClick={createTable} style={{padding:"7px 18px",borderRadius:8,background:"#1A3A6E",border:"none",color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer"}}>Crear</button>
              <button onClick={()=>setAddingTable(false)} style={{padding:"7px 12px",borderRadius:8,background:th.border,border:"none",color:th.text4,fontSize:12,cursor:"pointer"}}>Cancelar</button>
            </div>
          </div>
        </div>
      ):(
        <div style={{display:"flex",gap:8}}>
          <button onClick={()=>setAddingTable(true)} style={{flex:1,padding:"14px",borderRadius:12,border:"1.5px dashed "+th.border,background:"transparent",color:th.text5,fontSize:12,fontWeight:600,cursor:"pointer"}}>
            + Nueva tabla KPI para {selProj}
          </button>
          {selProj==="Estandarización FIRMES"&&(
            <button onClick={()=>{
              if(window.confirm("¿Resetear los datos de FIRMES a los valores por defecto?")){
                const fresh=JSON.parse(JSON.stringify(FIRMES_DEFAULT_TABLES));
                saveKPIs(selProj,fresh);
                setTables(fresh);
              }
            }} style={{padding:"8px 14px",borderRadius:12,border:"1px solid #FF6B6B55",background:"transparent",color:"#FF6B6B",fontSize:11,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap"}}>
              🔄 Resetear FIRMES
            </button>
          )}
        </div>
      )}
    </div>
  );
}


export default function App(){
  const [dark,setDark]=useState(()=>{try{const v=localStorage.getItem("mdt_dark");return v===null?true:v==="true";}catch{return true;}});
  useEffect(()=>{document.title="mardetareas";},[]);
  const [cats,setCats]=useState(()=>{
    try{
      const v=localStorage.getItem("mdt_cats");
      if(!v)return INITIAL;
      let stored=JSON.parse(v);
      let changed=false;
      // Migration: assign type:"tasks" to categories with no type
      stored=stored.map(c=>{
        if(!c.type){changed=true;return{...c,type:"tasks"};}
        return c;
      });
      // Migration: restore special categories if missing
      const specials=[
        {id:"c5",name:"Personal",icon:"🌿",colorIdx:8,type:"personal"},
        {id:"c6",name:"121 Manager",icon:"🎙️",colorIdx:6,type:"meeting"},
        {id:"c7",name:"121 Equipo",icon:"🗓️",colorIdx:7,type:"meeting121eq"},
      ];
      specials.forEach(spec=>{
        if(!stored.find(c=>c.type===spec.type)){
          stored=[...stored,{...spec,tasks:[]}];
          changed=true;
        }
      });
      if(changed)localStorage.setItem("mdt_cats",JSON.stringify(stored));
      return stored;
    }catch{return INITIAL;}
  });
  const th=dark?DARK:LIGHT;

  const [dragCatId,setDragCatId]=useState(null);
  const [dragOverId,setDragOverId]=useState(null);
  const handleCatDragStart=(id)=>setDragCatId(id);
  const handleCatDragOver=(e,id)=>{e.preventDefault();setDragOverId(id);};
  const handleCatDrop=(e,targetId)=>{
    e.preventDefault();
    if(!dragCatId||dragCatId===targetId)return;
    setCatsP(cs=>{
      const arr=[...cs];
      const from=arr.findIndex(c=>c.id===dragCatId);
      const to=arr.findIndex(c=>c.id===targetId);
      if(from<0||to<0)return cs;
      const [item]=arr.splice(from,1);
      arr.splice(to,0,item);
      return arr;
    });
    setDragCatId(null);setDragOverId(null);
  };
  const handleCatDragEnd=()=>{setDragCatId(null);setDragOverId(null);};
  const setCatsP=(fn)=>setCats(prev=>{const next=typeof fn==="function"?fn(prev):fn;try{localStorage.setItem("mdt_cats",JSON.stringify(next));}catch{}return next;});

  // Auto-generate recurrence instances on load
  useEffect(()=>{
    const todayD=new Date(today()+"T12:00:00");
    const advanceDeadline=(t)=>{
      const d=new Date(t.deadline+"T12:00:00");
      if(t.recurrence==="daily")d.setDate(d.getDate()+1);
      else if(t.recurrence==="weekly")d.setDate(d.getDate()+7);
      else if(t.recurrence==="biweekly")d.setDate(d.getDate()+14);
      else if(t.recurrence==="monthly")d.setMonth(d.getMonth()+1);
      return localISO(d);
    };
    setCatsP(prev=>prev.map(c=>({...c,tasks:(()=>{
      let tasks=[...c.tasks];
      let changed=false;
      tasks=tasks.map(t=>{
        if(!t.recurrence||!t.deadline||t.done)return t;
        // Advance deadline forward generating completed copies until deadline is in future
        let dl=t.deadline;
        const copies=[];
        while(new Date(dl+"T12:00:00")<=todayD){
          // Create completed historical copy
          copies.push({...t,id:genId(),recurrence:null,done:true,completedAt:dl,deadline:dl,createdAt:t.createdAt});
          dl=advanceDeadline({...t,deadline:dl});
          changed=true;
        }
        if(copies.length>0){
          tasks=[...tasks,...copies];
          return{...t,deadline:dl,createdAt:today()};
        }
        return t;
      });
      return changed?tasks:c.tasks;
    })()})));
  },[]);
  const setDarkP=(fn)=>setDark(prev=>{const next=typeof fn==="function"?fn(prev):fn;try{localStorage.setItem("mdt_dark",String(next));}catch{}return next;});

  const [tab,setTab]=useState("overview");
  const [calData,setCalData]=useState(()=>{try{const v=localStorage.getItem("mdt_caldata");return v?JSON.parse(v):null;}catch{return null;}});
  const updateCalData=(data)=>{setCalData(data);try{localStorage.setItem("mdt_caldata",JSON.stringify(data));}catch{}};
  const [mobileSidebarOpen,setMobileSidebarOpen]=useState(false);
  const [ncName,setNcName]=useState("");const [ncIcon,setNcIcon]=useState("📊");const [ncColor,setNcColor]=useState(0);const [showNc,setShowNc]=useState(false);
  const [editCatId,setEditCatId]=useState(null);const [editCatName,setEditCatName]=useState("");
  const [nText,setNText]=useState({});const [nDl,setNDl]=useState({});const [nPri,setNPri]=useState({});
  const [sortBy,setSortBy]=useState("priority");
  const [labelFilter,setLabelFilter]=useState({});
  const [hFrom,setHFrom]=useState("");
  const [hTo,setHTo]=useState("");
  const [histMode,setHistMode]=useState("period");
  const [selProjects,setSelProjects]=useState([]);
  const [projFrom,setProjFrom]=useState("");
  const [projTo,setProjTo]=useState("");
  const [searchQ,setSearchQ]=useState("");
  const [filterProj,setFilterProj]=useState("");
  const [filterKind,setFilterKind]=useState("");
  const [labelBank,setLabelBankRaw]=useState(()=>{
    try{const v=localStorage.getItem("mdt_labels");return v?JSON.parse(v):[];}catch{return[];}
  });
  const setLabelBank=(next)=>{setLabelBankRaw(next);try{localStorage.setItem("mdt_labels",JSON.stringify(next));}catch{}};

  const allTasks=cats.flatMap(c=>c.tasks.map(t=>{
    // Enrich meeting tasks with readable text
    let text=t.text||"";
    if(!text&&(c.type==="meeting"||c.type==="meeting121eq")){
      if(c.type==="meeting121eq"&&t.collaborator){
        text=`${t.meetingId||"E-?"} · ${t.collaborator}`;
      } else {
        text=t.meetingId||"M-?";
      }
    }
    return{...t,text,catId:c.id,catName:c.name,catIcon:c.icon,catColor:gc(COLORS[c.colorIdx],dark),catType:c.type};
  }));
  const doneTasks=allTasks.filter(t=>t.done&&t.catType!=="personal").sort((a,b)=>(b.completedAt||"").localeCompare(a.completedAt||""));
  const totalAll=allTasks.filter(t=>t.catType!=="personal").length;
  const totalDone=allTasks.filter(t=>t.done&&t.catType!=="personal").length;

  const updTask=(cId,tId,patch)=>setCatsP(cs=>cs.map(c=>c.id!==cId?c:{...c,tasks:c.tasks.map(t=>t.id!==tId?t:{...t,...patch})}));
  const nextRecurDeadline=(t)=>{
    if(!t.recurrence||!t.deadline)return null;
    const d=new Date(t.deadline+"T12:00:00");
    if(t.recurrence==="daily")d.setDate(d.getDate()+1);
    else if(t.recurrence==="weekly")d.setDate(d.getDate()+7);
    else if(t.recurrence==="biweekly")d.setDate(d.getDate()+14);
    else if(t.recurrence==="monthly")d.setMonth(d.getMonth()+1);
    return localISO(d);
  };
  const togTask=(cId,tId)=>setCatsP(cs=>cs.map(c=>c.id!==cId?c:{...c,tasks:c.tasks.map(t=>{
    if(t.id!==tId)return t;
    return{...t,done:!t.done,completedAt:!t.done?today():null};
  })}));
  const delTask=(cId,tId)=>setCatsP(cs=>cs.map(c=>c.id!==cId?c:{...c,tasks:c.tasks.filter(t=>t.id!==tId)}));

  const addTask=(cId)=>{
    const text=nText[cId]?.trim();if(!text)return;
    setCatsP(cs=>cs.map(c=>c.id!==cId?c:{...c,tasks:[...c.tasks,{id:genId(),text,done:false,priority:nPri[cId]||"media",createdAt:today(),deadline:nDl[cId]||null,completedAt:null,jiraUrl:"",description:"",checklist:[],contacts:[],labels:[]}]}));
    setNText(p=>({...p,[cId]:""}));setNDl(p=>({...p,[cId]:""}));
  };

  const addMeeting=(cId)=>{
    setCatsP(cs=>cs.map(c=>{
      if(c.id!==cId)return c;
      const lastM=c.tasks.find(t=>!t.done);
      const pendItems=lastM?(lastM.checklist||[]).filter(i=>i.state!=="Completada"&&i.state!=="Bloqueada"):[];
      return{...c,tasks:[mkMeeting(pendItems),...c.tasks]};
    }));
  };

  const addTeamMeeting=(cId)=>setCatsP(cs=>cs.map(c=>c.id!==cId?c:{...c,tasks:[mkTeamMeeting(""),...c.tasks]}));

  const setTeamMeetingCollaborator=(cId,tId,collaborator)=>{
    setCatsP(cs=>cs.map(c=>{
      if(c.id!==cId)return c;
      const thisMeeting=c.tasks.find(t=>t.id===tId);
      if(!collaborator||(thisMeeting?.checklist||[]).length>0)return{...c,tasks:c.tasks.map(t=>t.id!==tId?t:{...t,collaborator})};
      const prevMeeting=c.tasks.find(t=>t.id!==tId&&!t.done&&t.collaborator===collaborator);
      const pendItems=prevMeeting?(prevMeeting.checklist||[]).filter(i=>i.state!=="Completada"&&i.state!=="Bloqueada"):[];
      const inherited=pendItems.map(i=>({...mkChkItem(i.text,collaborator),carriedFrom:true,nextActions:i.nextActions||""}));
      return{...c,tasks:c.tasks.map(t=>t.id!==tId?t:{...t,collaborator,checklist:inherited})};
    }));
  };

  const addCat=()=>{if(!ncName.trim())return;setCatsP(cs=>[...cs,{id:genId(),name:ncName.trim(),icon:ncIcon,colorIdx:ncColor,type:"tasks",tasks:[]}]);setNcName("");setShowNc(false);};
  const delCat=(id)=>{setCatsP(cs=>cs.filter(c=>c.id!==id));if(tab===id)setTab("overview");};
  const saveCatName=(id)=>{if(editCatName.trim())setCatsP(cs=>cs.map(c=>c.id===id?{...c,name:editCatName.trim()}:c));setEditCatId(null);};

  const PORD={alta:0,media:1,baja:2};
  const sortT=(tasks)=>{
    const pend=[...tasks.filter(t=>!t.done)].sort((a,b)=>{
      if(sortBy==="priority")return PORD[a.priority]-PORD[b.priority];
      if(sortBy==="deadline"){if(!a.deadline&&!b.deadline)return 0;if(!a.deadline)return 1;if(!b.deadline)return -1;return a.deadline.localeCompare(b.deadline);}
      return(a.createdAt||"").localeCompare(b.createdAt||"");
    });
    return[...pend,...tasks.filter(t=>t.done)];
  };

  const selCat=cats.find(c=>c.id===tab);
  const isMeeting=(t)=>t==="meeting"||t==="meeting121eq";

  const navigateTo=(id)=>{setTab(id);setMobileSidebarOpen(false);};

  // Sidebar item
  const SI=({id,label,icon,cIdx,badge})=>{
    const isA=tab===id;const color=cIdx!=null?gc(COLORS[cIdx%COLORS.length],dark):null;
    const [hov,setHov]=useState(false);
    return(<div style={{display:"flex",alignItems:"center",gap:9,padding:"8px 10px",borderRadius:10,cursor:"pointer",background:isA?(color?color.light:th.border2):hov?th.border3:"transparent",borderLeft:isA?`2px solid ${color?color.accent:"#4ECDC4"}`:"2px solid transparent",marginBottom:2,transition:"background 0.1s"}}
      onClick={()=>navigateTo(id)}
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}>
      <span style={{fontSize:16}}>{icon}</span>
      <div style={{flex:1,minWidth:0}}>
        {editCatId===id?(<input autoFocus value={editCatName} onChange={e=>setEditCatName(e.target.value)} onBlur={()=>saveCatName(id)} onKeyDown={e=>{if(e.key==="Enter"||e.key==="Escape")saveCatName(id);}} onClick={e=>e.stopPropagation()} style={{background:"transparent",border:`1px solid ${color?color.accent:"#4ECDC4"}`,borderRadius:5,outline:"none",color:th.text,fontSize:12.5,fontWeight:700,width:"100%",padding:"1px 4px"}}/>):(
          <div style={{fontSize:12.5,fontWeight:isA?700:400,color:isA?(color?color.tc:th.text):th.text4,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{label}</div>
        )}
        {cIdx!=null&&<div style={{fontSize:10,color:isA?(color?color.tc+"88":th.text5):th.text6}}>{badge} pendiente{badge!==1?"s":""}</div>}
      </div>
      {badge>0&&cIdx!=null&&<span style={{background:color.accent,color:"#fff",fontSize:10,fontWeight:800,borderRadius:99,padding:"1px 6px",flexShrink:0,minWidth:16,textAlign:"center"}}>{badge}</span>}
      {cIdx!=null&&<span onClick={e=>{e.stopPropagation();setEditCatId(id);setEditCatName(label);}} style={{color:th.text6,cursor:"pointer",fontSize:11,flexShrink:0}}>✎</span>}
      {cIdx!=null&&<span onClick={e=>{e.stopPropagation();delCat(id);}} style={{color:th.text6,cursor:"pointer",fontSize:12,flexShrink:0}}>✕</span>}
    </div>);
  };

  const mkSidebar=()=>(<div style={{padding:"13px 10px 10px"}}>
    <p style={{margin:"0 0 7px 6px",color:th.text6,fontSize:10,fontWeight:700,letterSpacing:2,textTransform:"uppercase"}}>Navegación</p>
    <SI id="overview" label="Vista General" icon="◫" badge={0}/>
    <SI id="cal-equipo" label="Calendario equipo" icon="👥" badge={0}/>
    <SI id="cal-tareas" label="Calendario tareas" icon="📌" badge={0}/>
    <SI id="history" label={`Historial (${totalDone})`} icon="✓" badge={0}/>
    <SI id="kpis" label="KPIs" icon="📊" badge={0}/>
    <div style={{height:1,background:th.border3,margin:"9px 4px"}}/>
    <p style={{margin:"0 0 7px 6px",color:th.text6,fontSize:10,fontWeight:700,letterSpacing:2,textTransform:"uppercase"}}>Categorías</p>
    {cats.map(c=>(
      <div key={c.id} draggable onDragStart={()=>handleCatDragStart(c.id)} onDragOver={e=>handleCatDragOver(e,c.id)} onDrop={e=>handleCatDrop(e,c.id)} onDragEnd={handleCatDragEnd}
        style={{opacity:dragCatId===c.id?0.4:1,borderRadius:10,transition:"opacity 0.15s",outline:dragOverId===c.id&&dragCatId!==c.id?"2px dashed #4ECDC4":"none",cursor:"grab"}}>
        <SI id={c.id} label={c.name} icon={c.icon} cIdx={c.colorIdx} badge={c.tasks.filter(t=>!t.done).length}/>
      </div>
    ))}
    {!showNc?(<button onClick={()=>setShowNc(true)} style={{width:"100%",marginTop:6,padding:"8px 10px",borderRadius:10,border:`1.5px dashed ${th.border}`,background:"transparent",color:th.text6,fontSize:12,cursor:"pointer",textAlign:"left",display:"flex",alignItems:"center",gap:8}}><span>＋</span> Nueva categoría</button>):(
      <div style={{background:th.surface,borderRadius:12,padding:11,border:`1px solid ${th.border}`,marginTop:6,display:"flex",flexDirection:"column",gap:8}}>
        <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{ICONS.map(ic=><span key={ic} onClick={()=>setNcIcon(ic)} style={{fontSize:16,cursor:"pointer",padding:3,borderRadius:6,background:ncIcon===ic?th.border:"transparent"}}>{ic}</span>)}</div>
        <input autoFocus value={ncName} onChange={e=>setNcName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addCat()} placeholder="Nombre..." style={{...inp(th)}}/>
        <div style={{display:"flex",gap:5}}>{COLORS.map((c,i)=><div key={i} onClick={()=>setNcColor(i)} style={{width:18,height:18,borderRadius:99,background:c.bg,cursor:"pointer",border:ncColor===i?"2px solid "+th.text:"2px solid transparent"}}/>)}</div>
        <div style={{display:"flex",gap:6}}>
          <button onClick={addCat} style={{flex:1,padding:"6px 0",borderRadius:8,background:COLORS[ncColor].bg,border:"none",color:"#fff",fontWeight:800,fontSize:12,cursor:"pointer"}}>Crear</button>
          <button onClick={()=>setShowNc(false)} style={{flex:1,padding:"6px 0",borderRadius:8,background:th.border,border:"none",color:th.text4,fontSize:12,cursor:"pointer"}}>✕</button>
        </div>
      </div>
    )}
  </div>);

  return(
    <div style={{minHeight:"100vh",background:th.bg,fontFamily:"'DM Sans','Segoe UI',system-ui,sans-serif",display:"flex",flexDirection:"column",transition:"background 0.2s"}}>
      {/* Header */}
      <div style={{padding:"12px 16px",borderBottom:`1px solid ${th.border3}`,display:"flex",alignItems:"center",justifyContent:"space-between",gap:10,background:th.sidebar,boxShadow:dark?"none":"0 1px 6px #0001",position:"sticky",top:0,zIndex:100}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          {/* Mobile hamburger */}
          <button onClick={()=>setMobileSidebarOpen(o=>!o)} style={{display:"none",padding:"6px 8px",borderRadius:8,border:`1px solid ${th.border}`,background:th.surface,color:th.text3,fontSize:16,cursor:"pointer",lineHeight:1}} className="mobile-menu-btn">☰</button>
          <div>
            <h1 style={{margin:0,fontSize:18,fontWeight:800,color:th.text,letterSpacing:-0.5}}>🌊 mardetareas</h1>
            <p style={{margin:0,color:th.text5,fontSize:10}}>{totalAll-totalDone} pendientes · {totalDone} completadas</p>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
          <div style={{height:4,width:80,background:th.border2,borderRadius:99}}><div style={{height:4,borderRadius:99,transition:"width 0.5s",width:totalAll?`${(totalDone/totalAll)*100}%`:"0%",background:"linear-gradient(90deg,#4ECDC4,#6BCB77)"}}/></div>
          <span style={{color:"#4ECDC4",fontWeight:800,fontSize:11}}>{totalAll?Math.round((totalDone/totalAll)*100):0}%</span>
          <span style={{color:"#fff",fontSize:10,fontWeight:700,background:"#6633CC",padding:"3px 9px",borderRadius:6,flexShrink:0,whiteSpace:"nowrap"}} title="Último deploy">🕐 v98 · {BUILD_TIME.slice(5,10)} {BUILD_TIME.slice(11,16)}</span>
          <button onClick={()=>{const data={version:1,exportedAt:new Date().toISOString(),cats};const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=`mardetareas_backup_${today()}.json`;document.body.appendChild(a);a.click();document.body.removeChild(a);URL.revokeObjectURL(url);}} style={{padding:"5px 9px",borderRadius:99,border:`1px solid ${th.border}`,background:"transparent",color:"#6BCB77",fontSize:11,cursor:"pointer",fontWeight:700}}>⬇ Backup</button>
          <label style={{padding:"5px 9px",borderRadius:99,border:`1px solid ${th.border}`,background:"transparent",color:"#74B9FF",fontSize:11,cursor:"pointer",fontWeight:700}}>⬆ Restaurar<input type="file" accept=".json" style={{display:"none"}} onChange={e=>{const file=e.target.files[0];if(!file)return;const reader=new FileReader();reader.onload=ev=>{try{const data=JSON.parse(ev.target.result);if(!data.cats)throw new Error();if(window.confirm(`¿Restaurar backup del ${new Date(data.exportedAt).toLocaleDateString("es-ES")}?`)){setCatsP(data.cats);window.location.reload();}}catch{alert("Archivo no válido.");}};reader.readAsText(file);e.target.value="";}} /></label>
          <button onClick={()=>setDarkP(d=>!d)} style={{padding:"5px 9px",borderRadius:99,border:`1px solid ${th.border}`,background:th.surface,color:th.text3,fontSize:13,cursor:"pointer"}}>{dark?"☀️":"🌙"}</button>
          <button title="Borrar datos" onClick={()=>{if(window.confirm("¿Borrar todos los datos?")){localStorage.removeItem("mdt_cats");localStorage.removeItem("mdt_dark");window.location.reload();}}} style={{padding:"5px 8px",borderRadius:99,border:`1px solid ${th.border}`,background:"transparent",color:th.text6,fontSize:11,cursor:"pointer"}}>🗑️</button>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen&&<div style={{position:"fixed",inset:0,zIndex:200,display:"flex"}}>
        <div style={{width:240,background:th.sidebar,borderRight:`1px solid ${th.border3}`,overflowY:"auto",boxShadow:"4px 0 20px #0006"}}>
          <div style={{display:"flex",justifyContent:"flex-end",padding:"10px 10px 0"}}><button onClick={()=>setMobileSidebarOpen(false)} style={{background:"none",border:"none",color:th.text3,fontSize:18,cursor:"pointer"}}>✕</button></div>
          {mkSidebar()}
        </div>
        <div style={{flex:1,background:"#0008"}} onClick={()=>setMobileSidebarOpen(false)}/>
      </div>}

      <div style={{display:"flex",flex:1,overflow:"hidden"}}>
        {/* Desktop sidebar */}
        <div style={{width:215,minWidth:215,borderRight:`1px solid ${th.border3}`,overflowY:"auto",background:th.sidebar}} className="desktop-sidebar">
          {mkSidebar()}
        </div>

        {/* Main */}
        <div style={{flex:1,overflowY:"auto",padding:"18px 20px"}}>

          {/* OVERVIEW */}
          {tab==="overview"&&(()=>{
            const managerCat=cats.find(c=>c.type==="meeting");
            const equipoCat=cats.find(c=>c.type==="meeting121eq");
            const allUpcoming=allTasks.filter(t=>!t.done&&t.deadline).sort((a,b)=>a.deadline.localeCompare(b.deadline));
            const managerUp=managerCat?managerCat.tasks.filter(t=>!t.done).sort((a,b)=>(a.date||"").localeCompare(b.date||"")).slice(0,5):[];
            const equipoUp=equipoCat?equipoCat.tasks.filter(t=>!t.done).sort((a,b)=>(a.date||"").localeCompare(b.date||"")).slice(0,5):[];
            const otherUp=allUpcoming.filter(t=>{const cat=cats.find(c=>c.id===t.catId);return cat&&(!cat.type||cat.type==="tasks");}).slice(0,8);
            return(<div>
              <div style={{marginBottom:16}}>
                <h2 style={{margin:"0 0 12px",color:th.text,fontSize:17,fontWeight:800}}>Vista General</h2>
                <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                  <div style={{position:"relative",flex:"1 1 200px",minWidth:160}}>
                    <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",fontSize:12,color:th.text5,pointerEvents:"none",lineHeight:1}}>🔍</span>
                    <input value={searchQ} onChange={e=>setSearchQ(e.target.value)}
                      placeholder="Buscar tareas..."
                      style={{...inp(th,{paddingLeft:30,fontSize:12,width:"100%",boxSizing:"border-box",height:34})}}/>
                  </div>
                  <select value={filterProj} onChange={e=>setFilterProj(e.target.value)}
                    style={{...inp(th,{fontSize:12,minWidth:150,cursor:"pointer",height:34,flex:"0 0 auto"})}}>
                    <option value="">🏷 Todos los proyectos</option>
                    {[...new Set(allTasks.flatMap(t=>(t.labels||[]).map(l=>l.text)))].sort().map(p=>(
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                  <select value={filterKind} onChange={e=>setFilterKind(e.target.value)}
                    style={{...inp(th,{fontSize:12,minWidth:130,cursor:"pointer",height:34,flex:"0 0 auto"})}}>
                    <option value="">Todos los tipos</option>
                    {Object.entries(TASK_KIND).map(([k,v])=>(<option key={k} value={k}>{v.icon} {v.label}</option>))}
                  </select>
                  {(searchQ||filterProj||filterKind)&&<button onClick={()=>{setSearchQ("");setFilterProj("");setFilterKind("");}}
                    style={{padding:"0 12px",height:34,borderRadius:7,background:th.border,border:"none",color:th.text4,fontSize:11,cursor:"pointer",flexShrink:0}}>✕ Limpiar</button>}
                </div>
              </div>
              {(searchQ||filterProj||filterKind)?(()=>{
                const q=searchQ.toLowerCase();
                const matched=allTasks.filter(t=>{
                  const textMatch=!q||(t.text||"").toLowerCase().includes(q)||(t.description||"").toLowerCase().includes(q);
                  const projMatch=!filterProj||(t.labels||[]).some(l=>l.text===filterProj);
                  const kindMatch=!filterKind||(t.taskKind||"tarea")===filterKind;
                  return textMatch&&projMatch&&kindMatch&&!t.done;
                });
                const matchedDone=allTasks.filter(t=>{
                  const textMatch=!q||(t.text||"").toLowerCase().includes(q)||(t.description||"").toLowerCase().includes(q);
                  const projMatch=!filterProj||(t.labels||[]).some(l=>l.text===filterProj);
                  const kindMatch=!filterKind||(t.taskKind||"tarea")===filterKind;
                  return textMatch&&projMatch&&kindMatch&&t.done;
                });
                if(matched.length===0&&matchedDone.length===0)return<div style={{padding:"40px 20px",textAlign:"center",color:th.text5,fontSize:13}}>No se encontraron tareas</div>;
                return(<div>
                  {matched.length>0&&<>
                    <div style={{fontSize:11,fontWeight:700,color:th.text5,letterSpacing:1,textTransform:"uppercase",marginBottom:8}}>
                      {matched.length} tarea{matched.length!==1?"s":""} pendiente{matched.length!==1?"s":""}
                    </div>
                    {matched.map(t=>{
                      const cat=cats.find(c=>c.id===t.catId);
                      const color=cat?gc(COLORS[cat.colorIdx],dark):{bg:"#eee",text:"#333",dot:"#999"};
                      const s=TASK_STATUS[t.status||"backlog"];
                      return(<div key={t.id} style={{background:th.rowBg,borderRadius:10,padding:"10px 14px",marginBottom:6,border:`1px solid ${th.border2}`,display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
                        <div style={{width:8,height:8,borderRadius:99,background:color.dot,flexShrink:0}}/>
                        <span style={{flex:1,fontSize:13,color:th.text,fontWeight:600,minWidth:120}}>{t.text}</span>
                        {cat&&<span style={{fontSize:10,color:"#888",background:dark?"#333":"#EEEEEE",padding:"2px 8px",borderRadius:99,flexShrink:0}}>{cat.icon} {cat.name}</span>}
                        {(t.labels||[]).map(lb=><span key={lb.id} style={{fontSize:10,color:lb.color,background:lb.color+"22",padding:"2px 8px",borderRadius:99,fontWeight:600}}>{lb.text}</span>)}
                        {(t.status||"backlog")!=="backlog"&&<span style={{fontSize:10,fontWeight:700,color:s.color,background:s.bg,padding:"2px 8px",borderRadius:6,borderLeft:`3px solid ${s.color}`}}>{s.icon} {s.label}</span>}
                        {t.deadline&&<span style={{fontSize:10,color:th.text5,flexShrink:0}}>📅 {t.deadline}</span>}
                        {t.priority&&<span style={{fontSize:10,color:th.text5}}>● {t.priority}</span>}
                      </div>);
                    })}
                  </>}
                  {matchedDone.length>0&&<div style={{marginTop:12,fontSize:11,color:th.text5,fontWeight:600}}>{matchedDone.length} completada{matchedDone.length!==1?"s":""} también coinciden</div>}
                </div>);
              })():(
              <div><Dashboard cats={cats} th={th} dark={dark} onNavigate={navigateTo}/>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(170px,1fr))",gap:10,marginBottom:24}}>
                {cats.map(cat=>{
                  const color=gc(COLORS[cat.colorIdx],dark);
                  let done,total,subtitle,progress;
                  if(isMeeting(cat.type)){
                    const items=cat.tasks.filter(m=>!m.done).flatMap(m=>m.checklist||[]);
                    done=items.filter(i=>i.state==="Completada").length;
                    total=items.length;
                    const mtgPend=cat.tasks.filter(m=>!m.done).length;
                    subtitle=`${mtgPend} reunión${mtgPend!==1?"es":""} activa${mtgPend!==1?"s":""}`;  
                    progress=total?`${done}/${total} puntos`:`0/${total} puntos`;
                  } else if(cat.type==="personal"){
                    const pend=cat.tasks.filter(t=>!t.done).length;
                    done=0;total=cat.tasks.length;
                    subtitle=`${total} personales`;
                    progress=`${pend} pendientes`;
                  } else {
                    done=cat.tasks.filter(t=>t.done).length;
                    total=cat.tasks.length;
                    subtitle=`${total} tareas`;
                    progress=`${done}/${total} hechas`;
                  }
                  const pct=total?(done/total)*100:0;
                  return(
                  <div key={cat.id} onClick={()=>navigateTo(cat.id)} style={{background:th.cardBg,border:`1px solid ${th.border2}`,borderRadius:13,padding:13,cursor:"pointer",transition:"all 0.18s",boxShadow:dark?"none":"0 2px 8px #0001"}}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor=color.accent+"66";e.currentTarget.style.transform="translateY(-2px)";}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor=th.border2;e.currentTarget.style.transform="none";}}>
                    <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:9}}>
                      <div style={{width:32,height:32,borderRadius:9,background:color.light,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>{cat.icon}</div>
                      <div><div style={{color:th.text,fontWeight:700,fontSize:12.5}}>{cat.name}</div><div style={{color:th.text5,fontSize:10}}>{subtitle}</div></div>
                    </div>
                    <div style={{height:3,background:th.border2,borderRadius:99,marginBottom:6}}><div style={{height:3,borderRadius:99,background:color.bg,width:`${pct}%`,transition:"width 0.4s"}}/></div>
                    <span style={{color:th.text5,fontSize:11}}>{progress}</span>
                  </div>
                );})}
              </div>
              <h3 style={{color:th.text4,fontSize:12,fontWeight:700,marginBottom:12,marginTop:0}}>Próximas reuniones y vencimientos</h3>
              {managerCat&&<UpcomingGroup title={managerCat.name} tasks={managerUp.map(m=>({...m,catId:managerCat.id,catIcon:managerCat.icon,text:m.checklist&&m.checklist.length>0?m.checklist[0].text:m.meetingId,deadline:null,meetingDate:m.date}))} icon={managerCat.icon} color={gc(COLORS[managerCat.colorIdx],dark)} th={th} dark={dark} defaultOpen={true} onNavigate={navigateTo}/>}
              {equipoCat&&<UpcomingGroup title={equipoCat.name} tasks={equipoUp.map(m=>({...m,catId:equipoCat.id,catIcon:equipoCat.icon,text:m.collaborator||(m.checklist&&m.checklist.length>0?m.checklist[0].text:m.meetingId),deadline:null,meetingDate:m.date}))} icon={equipoCat.icon} color={gc(COLORS[equipoCat.colorIdx],dark)} th={th} dark={dark} defaultOpen={true} onNavigate={navigateTo}/>}
              {otherUp.length>0&&<UpcomingGroup title="Resto de categorías" tasks={otherUp} icon="📌" color={gc(COLORS[0],dark)} th={th} dark={dark} defaultOpen={false} onNavigate={navigateTo}/>}
              {managerUp.length===0&&equipoUp.length===0&&otherUp.length===0&&<p style={{color:th.text6,fontSize:13}}>Sin deadlines próximos.</p>}
            </div>)}
            </div>);
          })()}
          {/* CALENDAR EQUIPO */}
          {tab==="cal-equipo"&&<CalendarView th={th} dark={dark} calData={calData} onCalDataUpdate={updateCalData}/>}

          {/* CALENDAR TAREAS */}
          {tab==="cal-tareas"&&<TasksCalendarView cats={cats} th={th} dark={dark} onNavigate={navigateTo}/>}

          {/* CALENDAR PERSONAL */}
          {tab==="cal-personal"&&<TasksCalendarView cats={cats} th={th} dark={dark} onNavigate={navigateTo} personalOnly={true}/>}

          {/* PERSONAL */}
          {selCat&&selCat.type==="personal"&&(
            <PersonalView cat={selCat} th={th} dark={dark} calData={calData}
              onToggle={tId=>togTask(selCat.id,tId)}
              onDelete={tId=>delTask(selCat.id,tId)}
              onUpdate={(tId,p)=>updTask(selCat.id,tId,p)}
              onAddTask={t=>setCatsP(cs=>cs.map(c=>c.id!==selCat.id?c:{...c,tasks:[...c.tasks,t]}))}
              labelBank={labelBank} onLabelBankChange={setLabelBank}/>
          )}

          {/* TASKS */}
          {selCat&&(!selCat.type||selCat.type==="tasks")&&(()=>{
            const cat=selCat;const color=gc(COLORS[cat.colorIdx],dark);
            const allLabels=[...new Map(cat.tasks.flatMap(t=>(t.labels||[])).map(l=>[l.text,l])).values()];
            const activeLF=labelFilter[cat.id]||null;
            const filtered=cat.tasks.filter(t=>!activeLF||(t.labels||[]).some(l=>l.text===activeLF));
            const sorted=sortT(filtered);
            return(<div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,flexWrap:"wrap",gap:10}}>
                <div style={{display:"flex",alignItems:"center",gap:12}}>
                  <div style={{width:40,height:40,borderRadius:11,background:color.light,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{cat.icon}</div>
                  <div><h2 style={{margin:0,color:th.text,fontSize:18,fontWeight:800}}>{cat.name}</h2><span style={{color:th.text5,fontSize:11}}>{cat.tasks.filter(t=>!t.done).length} pendientes · {cat.tasks.filter(t=>t.done).length} completadas</span></div>
                </div>
                <div style={{display:"flex",gap:5}}>{[["priority","Prioridad"],["deadline","Deadline"],["createdAt","Creación"]].map(([k,l])=>(<button key={k} onClick={()=>setSortBy(k)} style={{padding:"4px 11px",borderRadius:99,fontSize:11,cursor:"pointer",border:"none",background:sortBy===k?color.light:th.border2,color:sortBy===k?color.tc:th.text5,fontWeight:sortBy===k?700:400}}>{l}</button>))}</div>
              </div>
              {allLabels.length>0&&(<div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12,alignItems:"center"}}>
                <span style={{fontSize:10,color:th.text5,fontWeight:700}}>🏷️</span>
                <button onClick={()=>setLabelFilter(p=>({...p,[cat.id]:null}))} style={{padding:"2px 10px",borderRadius:99,fontSize:11,cursor:"pointer",border:`1.5px solid ${!activeLF?color.accent:th.border}`,background:!activeLF?color.light:"transparent",color:!activeLF?color.tc:th.text5,fontWeight:!activeLF?700:400}}>Todas</button>
                {allLabels.map(lb=>(<button key={lb.id} onClick={()=>setLabelFilter(p=>({...p,[cat.id]:activeLF===lb.text?null:lb.text}))} style={{padding:"2px 10px",borderRadius:99,fontSize:11,cursor:"pointer",border:`1.5px solid ${activeLF===lb.text?lb.color:lb.color+"55"}`,background:activeLF===lb.text?lb.color+"22":"transparent",color:activeLF===lb.text?lb.color:th.text4,fontWeight:activeLF===lb.text?700:400}}>{lb.text}</button>))}
              </div>)}
              <div style={{background:th.surface2,borderRadius:12,padding:12,marginBottom:16,border:`1px solid ${th.border2}`}}>
                <div style={{display:"flex",gap:7,marginBottom:8}}>
                  <input value={nText[cat.id]||""} onChange={e=>setNText(p=>({...p,[cat.id]:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&addTask(cat.id)} placeholder="Nueva tarea..." style={{...inp(th),flex:1}}/>
                  <button onClick={()=>addTask(cat.id)} style={{padding:"8px 14px",borderRadius:8,background:color.bg,border:"none",color:"#fff",fontWeight:800,fontSize:13,cursor:"pointer"}}>＋</button>
                </div>
                <div style={{display:"flex",gap:7,flexWrap:"wrap",alignItems:"center"}}>
                  <input type="date" value={nDl[cat.id]||""} onChange={e=>setNDl(p=>({...p,[cat.id]:e.target.value}))} style={{...inp(th,{fontSize:11.5,padding:"4px 8px",colorScheme:dark?"dark":"light"})}}/>
                  {Object.entries(PRIORITY).map(([k])=>(<button key={k} onClick={()=>setNPri(p=>({...p,[cat.id]:k}))} style={{padding:"3px 10px",borderRadius:99,fontSize:11.5,cursor:"pointer",...ps(k,(nPri[cat.id]||"media")===k,dark)}}>{PRIORITY[k].dot} {PRIORITY[k].label}</button>))}
                </div>
              </div>
              {sorted.length===0&&<p style={{color:th.text6,fontSize:13,textAlign:"center",paddingTop:28}}>{activeLF?`Sin tareas con etiqueta "${activeLF}" 🏷️`:"Sin tareas aún 🚀"}</p>}
              {sorted.map(t=>(<TaskRow key={t.id} task={t} color={color} th={th} onToggle={()=>togTask(cat.id,t.id)} onDelete={()=>delTask(cat.id,t.id)} onUpdate={p=>updTask(cat.id,t.id,p)} labelBank={labelBank} onLabelBankChange={setLabelBank}/>))}
            </div>);
          })()}

          {/* 121 MANAGER */}
          {selCat&&selCat.type==="meeting"&&(()=>{
            const cat=selCat;const color=gc(COLORS[cat.colorIdx],dark);
            const pend=cat.tasks.filter(t=>!t.done);const done=cat.tasks.filter(t=>t.done);
            const lastM=pend[0];const pendItems=lastM?(lastM.checklist||[]).filter(i=>i.state!=="Completada"&&i.state!=="Bloqueada"):[];
            return(<div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18,flexWrap:"wrap",gap:10}}>
                <div style={{display:"flex",alignItems:"center",gap:12}}>
                  <div style={{width:40,height:40,borderRadius:11,background:color.light,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{cat.icon}</div>
                  <div><h2 style={{margin:0,color:th.text,fontSize:18,fontWeight:800}}>{cat.name}</h2><span style={{color:th.text5,fontSize:11}}>{pend.length} activas · {done.length} cerradas</span></div>
                </div>
                <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:5}}>
                  <div style={{display:"flex",gap:8}}>
                    <button onClick={()=>exportAllMeetings(cats)} style={{padding:"8px 12px",borderRadius:9,background:dark?"#0F2215":"#EDFAEF",border:"1px solid #6BCB7766",color:"#6BCB77",fontSize:12,fontWeight:700,cursor:"pointer"}}>⬇ Excel todo</button>
                    <button onClick={()=>addMeeting(cat.id)} style={{padding:"9px 16px",borderRadius:10,background:color.bg,border:"none",color:"#fff",fontWeight:800,fontSize:13,cursor:"pointer"}}>＋ Nueva reunión</button>
                  </div>
                  {pendItems.length>0&&<span style={{fontSize:10,color:"#FF9F43"}}>↩ Se añadirán {pendItems.length} punto{pendItems.length!==1?"s":""} pendiente{pendItems.length!==1?"s":""}</span>}
                </div>
              </div>
              {cat.tasks.length>0&&(<div style={{display:"flex",alignItems:"center",gap:10,padding:"4px 13px",marginBottom:4}}>
                <div style={{width:19,flexShrink:0}}/><span style={{width:90,fontSize:10,color:th.text6,fontWeight:700,letterSpacing:1,textTransform:"uppercase",flexShrink:0}}>ID</span>
                <span style={{flex:1,fontSize:10,color:th.text6,fontWeight:700,letterSpacing:1,textTransform:"uppercase"}}>Puntos</span>
                <span style={{width:85,fontSize:10,color:th.text6,fontWeight:700,letterSpacing:1,textTransform:"uppercase",flexShrink:0}}>Fecha</span>
                <span style={{width:90,fontSize:10,color:th.text6,fontWeight:700,letterSpacing:1,textTransform:"uppercase",flexShrink:0}}>Estado</span>
                <div style={{width:30,flexShrink:0}}/>
              </div>)}
              {cat.tasks.length===0&&<p style={{color:th.text6,fontSize:13,textAlign:"center",paddingTop:28}}>Sin reuniones aún 🗓️</p>}
              {[...pend,...done].map(m=>(<MeetingRow key={m.id} meeting={m} color={color} th={th} catName={cat.name} onUpdate={p=>updTask(cat.id,m.id,p)} onDelete={()=>delTask(cat.id,m.id)} onToggle={()=>togTask(cat.id,m.id)} onExport={mt=>exportMeeting(mt,cat.name)}/>))}
            </div>);
          })()}

          {/* 121 EQUIPO */}
          {selCat&&selCat.type==="meeting121eq"&&(()=>{
            const cat=selCat;const color=gc(COLORS[cat.colorIdx],dark);
            const pend=cat.tasks.filter(t=>!t.done);const done=cat.tasks.filter(t=>t.done);
            const collabs=[...new Set(pend.map(m=>m.collaborator||"").filter(Boolean))];
            return(<div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18,flexWrap:"wrap",gap:10}}>
                <div style={{display:"flex",alignItems:"center",gap:12}}>
                  <div style={{width:40,height:40,borderRadius:11,background:color.light,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{cat.icon}</div>
                  <div><h2 style={{margin:0,color:th.text,fontSize:18,fontWeight:800}}>{cat.name}</h2><span style={{color:th.text5,fontSize:11}}>{pend.length} activas · {done.length} cerradas</span></div>
                </div>
                <div style={{display:"flex",gap:8}}>
                  <button onClick={()=>exportAllMeetings(cats)} style={{padding:"8px 12px",borderRadius:9,background:dark?"#0F2215":"#EDFAEF",border:"1px solid #6BCB7766",color:"#6BCB77",fontSize:12,fontWeight:700,cursor:"pointer"}}>⬇ Excel todo</button>
                  <button onClick={()=>addTeamMeeting(cat.id)} style={{padding:"9px 16px",borderRadius:10,background:color.bg,border:"none",color:"#fff",fontWeight:800,fontSize:13,cursor:"pointer"}}>＋ Nueva reunión</button>
                </div>
              </div>
              {collabs.length>0&&(<div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}>
                {collabs.map(collab=>{const meetings=pend.filter(m=>m.collaborator===collab);const totalChk=meetings.reduce((a,m)=>a+(m.checklist||[]).length,0);const doneChk=meetings.reduce((a,m)=>a+(m.checklist||[]).filter(i=>i.state==="Completada").length,0);return(<div key={collab} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 12px",borderRadius:10,background:color.light,border:`1px solid ${color.accent}33`}}>
                  <div style={{width:28,height:28,borderRadius:99,background:color.accent,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,color:"#fff",fontWeight:800}}>{collab[0].toUpperCase()}</div>
                  <div><div style={{fontSize:12,fontWeight:700,color:color.tc}}>{collab}</div><div style={{fontSize:10,color:color.tc+"99"}}>{totalChk>0?`${doneChk}/${totalChk}`:"Sin puntos"}</div></div>
                </div>);})}</div>)}
              {cat.tasks.length===0&&<p style={{color:th.text6,fontSize:13,textAlign:"center",paddingTop:28}}>Sin reuniones aún 🗓️</p>}
              {[...pend,...done].map(m=>(<TeamMeetingRow key={m.id} meeting={m} color={color} th={th} catName={cat.name} onUpdate={p=>updTask(cat.id,m.id,p)} onSetCollaborator={collab=>setTeamMeetingCollaborator(cat.id,m.id,collab)} onDelete={()=>delTask(cat.id,m.id)} onToggle={()=>togTask(cat.id,m.id)} onExport={mt=>exportMeeting(mt,cat.name)}/>))}
            </div>);
          })()}

          {/* HISTORY */}
          {tab==="history"&&(()=>{
            const filtered=doneTasks.filter(t=>{
              if(hFrom&&(t.completedAt||"")<hFrom)return false;
              if(hTo&&(t.completedAt||"")>hTo)return false;
              return true;
            });
            return(<div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,flexWrap:"wrap",gap:10}}>
              <div><h2 style={{color:th.text,fontSize:18,fontWeight:800,margin:0}}>Historial</h2><p style={{color:th.text5,fontSize:11,margin:"3px 0 0"}}>{filtered.length} de {doneTasks.length} finalizadas</p></div>
            </div>

            {/* ── Mode tabs ── */}
            <div style={{display:"flex",gap:6,marginBottom:16,flexWrap:"wrap"}}>
              {[["period","📅 Por periodo"],["week","📆 Por semana"],["project","🏷️ Por proyecto"]].map(([m,l])=>(
                <button key={m} onClick={()=>setHistMode(m)} style={{padding:"7px 14px",borderRadius:9,fontSize:12,fontWeight:700,cursor:"pointer",border:`1.5px solid ${histMode===m?"#1A3A6E":th.border}`,background:histMode===m?dark?"#0D1E35":"#E8EEF8":"transparent",color:histMode===m?"#1A3A6E":th.text4}}>{l}</button>
              ))}
            </div>

            {/* ── Period / Week filters ── */}
            {histMode!=="project"&&<div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap",marginBottom:16,padding:"10px 14px",background:th.surface2,borderRadius:11,border:`1px solid ${th.border2}`}}>
              {histMode==="week"?(<>
                <span style={{fontSize:11,color:th.text5,fontWeight:700}}>📆 Semana:</span>
                <button onClick={()=>setHFrom(addDays(hFrom||getWeekStart(today()),-7))||setHTo(addDays(hTo||addDays(getWeekStart(today()),6),-7))} style={{padding:"4px 9px",borderRadius:7,border:`1px solid ${th.border}`,background:th.surface,color:th.text3,cursor:"pointer",fontSize:12}}>‹</button>
                <span style={{fontSize:12,color:th.text2,fontWeight:600}}>{hFrom?`${fmtShort(hFrom)} – ${fmtShort(addDays(hFrom,6))}`:"Selecciona semana"}</span>
                <button onClick={()=>setHFrom(addDays(hFrom||getWeekStart(today()),7))||setHTo(addDays(hTo||addDays(getWeekStart(today()),6),7))} style={{padding:"4px 9px",borderRadius:7,border:`1px solid ${th.border}`,background:th.surface,color:th.text3,cursor:"pointer",fontSize:12}}>›</button>
                <button onClick={()=>{const w=getWeekStart(today());setHFrom(w);setHTo(addDays(w,6));}} style={{padding:"4px 9px",borderRadius:7,border:`1px solid ${th.border}`,background:th.surface,color:th.text3,cursor:"pointer",fontSize:11}}>Esta semana</button>
              </>):(<>
                <span style={{fontSize:11,color:th.text5,fontWeight:700}}>📅 Periodo:</span>
                <span style={{fontSize:11,color:th.text4}}>Desde</span>
                <input type="date" value={hFrom} onChange={e=>setHFrom(e.target.value)} style={{...inp(th,{fontSize:11,padding:"4px 8px",colorScheme:dark?"dark":"light"})}}/>
                <span style={{fontSize:11,color:th.text4}}>Hasta</span>
                <input type="date" value={hTo} onChange={e=>setHTo(e.target.value)} style={{...inp(th,{fontSize:11,padding:"4px 8px",colorScheme:dark?"dark":"light"})}}/>
              </>)}
              {(hFrom||hTo)&&<button onClick={()=>{setHFrom("");setHTo("");}} style={{padding:"4px 10px",borderRadius:7,background:th.border,border:"none",color:th.text4,fontSize:11,cursor:"pointer"}}>✕ Limpiar</button>}
              {doneTasks.length>0&&<button onClick={()=>exportHistorialXLSX(filtered)} style={{marginLeft:"auto",padding:"7px 14px",borderRadius:9,background:dark?"#0F2215":"#EDFAEF",border:"1px solid #6BCB7766",color:"#6BCB77",fontSize:12,fontWeight:700,cursor:"pointer"}}>⬇ Excel + Dashboard</button>}
            </div>}

            {/* ── Project mode ── */}
            {histMode==="project"&&(()=>{
              const allLabels=[...new Map(cats.flatMap(c=>c.tasks).flatMap(t=>t.labels||[]).map(l=>[l.text,l])).values()];
              return(<div style={{marginBottom:16}}>
                <div style={{padding:"12px 14px",background:th.surface2,borderRadius:11,border:`1px solid ${th.border2}`,marginBottom:12}}>
                  <div style={{fontSize:11,color:th.text5,fontWeight:700,marginBottom:10}}>🏷️ Selecciona proyectos para el informe:</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                    {allLabels.length===0&&<span style={{fontSize:12,color:th.text6}}>No hay etiquetas/proyectos creados aún.</span>}
                    {allLabels.map(lb=>(<button key={lb.text} onClick={()=>setSelProjects(p=>p.includes(lb.text)?p.filter(x=>x!==lb.text):[...p,lb.text])}
                      style={{padding:"4px 12px",borderRadius:99,fontSize:12,fontWeight:700,cursor:"pointer",
                        border:`1.5px solid ${selProjects.includes(lb.text)?lb.color:lb.color+"55"}`,
                        background:selProjects.includes(lb.text)?lb.color+"22":"transparent",
                        color:selProjects.includes(lb.text)?lb.color:th.text4}}>{lb.text}</button>))}
                  </div>
                  {selProjects.length>0&&(<>
              <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap",marginTop:12}}>
                <span style={{fontSize:11,color:th.text5,fontWeight:700}}>📅 Periodo del informe:</span>
                <span style={{fontSize:11,color:th.text4}}>Desde</span>
                <input type="date" value={projFrom} onChange={e=>setProjFrom(e.target.value)} style={{...inp(th,{fontSize:11,padding:"4px 8px",colorScheme:dark?"dark":"light"})}}/>
                <span style={{fontSize:11,color:th.text4}}>Hasta</span>
                <input type="date" value={projTo} onChange={e=>setProjTo(e.target.value)} style={{...inp(th,{fontSize:11,padding:"4px 8px",colorScheme:dark?"dark":"light"})}}/>
                {(projFrom||projTo)&&<button onClick={()=>{setProjFrom("");setProjTo("");}} style={{padding:"4px 10px",borderRadius:7,background:th.border,border:"none",color:th.text4,fontSize:11,cursor:"pointer"}}>✕ Limpiar</button>}
              </div>
              <button onClick={()=>exportProjectReport(cats,selProjects,dark,Object.fromEntries(selProjects.map(p=>[p,JSON.parse(localStorage.getItem('mdt_kpis_'+p)||'[]')])),projFrom,projTo)} style={{marginTop:12,padding:"8px 16px",borderRadius:9,background:dark?"#0D1E35":"#E8EEF8",border:"1px solid #1A3A6E44",color:"#1A3A6E",fontSize:12,fontWeight:700,cursor:"pointer"}}>⬇ Generar informe ejecutivo (HTML+PDF)</button>
            </>)}
                </div>
                {selProjects.length===0&&<p style={{color:th.text6,fontSize:13,textAlign:"center",paddingTop:20}}>Selecciona uno o más proyectos para generar el informe.</p>}
              </div>);
            })()}
            {filtered.length===0&&<p style={{color:th.text6,fontSize:13,textAlign:"center",paddingTop:36}}>{doneTasks.length===0?"Aún no hay tareas completadas.":"Sin tareas en ese rango de fechas."}</p>}
            {filtered.map(t=>{const color=t.catColor;const chkD=(t.checklist||[]).filter(i=>i.done).length;const chkT=(t.checklist||[]).length;return(<div key={t.id} style={{display:"flex",alignItems:"flex-start",gap:12,background:th.cardBg,borderRadius:11,padding:"11px 13px",marginBottom:7,border:`1px solid ${th.border3}`,boxShadow:dark?"none":"0 1px 3px #0001"}}>
              <div style={{width:28,height:28,borderRadius:8,background:color.light,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0}}>{t.catIcon}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{color:th.text4,fontSize:13,textDecoration:"line-through",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.text||""}</div>
                <div style={{display:"flex",gap:8,marginTop:4,flexWrap:"wrap",alignItems:"center"}}>
                  <span style={{color:color.tc,fontSize:10,background:color.light,padding:"1px 7px",borderRadius:99}}>{t.catName}</span>
                  <span style={{color:th.text6,fontSize:10}}>📅 <span style={{color:th.text4}}>{fmt(t.createdAt)}</span></span>
                  {t.completedAt&&<span style={{fontSize:10,color:"#6BCB77"}}>✓ {fmt(t.completedAt)}</span>}
                  {chkT>0&&<span style={{color:th.text4,fontSize:10}}>☑ {chkD}/{chkT}</span>}
                </div>
              </div>
              <button onClick={()=>togTask(t.catId,t.id)} style={{background:th.border2,border:"none",borderRadius:7,padding:"4px 9px",color:th.text4,fontSize:11,cursor:"pointer",flexShrink:0}}>Reabrir</button>
            </div>);})}
          </div>);})()}

          {/* ── KPI Tab ── */}
          {tab==="kpis"&&<KPITab th={th} dark={dark} labelBank={labelBank}/>}
        </div>
      </div>

      {/* Mobile bottom nav */}
      <style>{`
        @media(max-width:640px){
          .desktop-sidebar{display:none!important;}
          .mobile-menu-btn{display:flex!important;}
        }
        @media(min-width:641px){
          .mobile-menu-btn{display:none!important;}
        }
      `}</style>
    </div>
  );
}
