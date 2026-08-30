CREATE DATABASE  IF NOT EXISTS `secondlife_resume` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `secondlife_resume`;
-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: secondlife_resume
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `portfolios`
--

DROP TABLE IF EXISTS `portfolios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `portfolios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `theme` varchar(50) DEFAULT 'Developer',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `data` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `portfolios_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `portfolios`
--

LOCK TABLES `portfolios` WRITE;
/*!40000 ALTER TABLE `portfolios` DISABLE KEYS */;
INSERT INTO `portfolios` VALUES (1,1,'Frontend Dev2026','Minimalist','2026-08-29 19:09:51','2026-08-30 09:15:32',NULL),(2,1,'new','Neon Creative','2026-08-29 19:16:46','2026-08-30 10:09:42',NULL),(3,1,'ccdv','Modern','2026-08-29 19:53:44','2026-08-30 09:50:30',NULL),(4,1,'Test','Minimalist','2026-08-30 11:33:34','2026-08-30 13:54:06','{\"intro\": {\"name\": \"Raghavendra Singh\", \"title\": \"COMPUTER SCIENCE ENGINEER | IOT • CYBERSECURITY • AI/ML ENTHUSIAST\", \"summary\": \"Computer Science and IoT engineering student passionate about building secure, scalable, and intelligent applications. Experienced in full-stack development, AI integration, and IoT systems, with a strong foundation in cybersecurity and blockchain concepts. Proven project experience through competitive hackathons, academic leadership, and hands-on development.\", \"photoUrl\": \"http://localhost:5000/uploads/1788090779863-284614947-Profile Pic.jpeg\"}, \"skills\": [\"JavaScript\", \"Java\", \"C\", \"Python\", \"React.js\", \"TypeScript\", \"Tailwind CSS\", \"Node.js\", \"Express.js\", \"Firebase\", \"MongoDB\", \"MySQL\", \"MySQL Workbench\", \"Embeded Systems\", \"Git\", \"GitHub\", \"IntelliJ\", \"VS Code\", \"Netlify\", \"Vercel\", \"Arduino\"], \"contact\": {\"email\": \"raghavendrarameshsingh@gmail.com\", \"github\": \"github.com/M0NSTER01\", \"linkedin\": \"LinkedIn\"}, \"visible\": {\"skills\": true, \"projects\": true, \"education\": true, \"experience\": false, \"certifications\": true}, \"projects\": [{\"id\": 1, \"desc\": \"A full-stack web platform designed to facilitate the recovery of lost or stolen mobile devices even when offline through IMEI registration and anonymous peer-to-peer communication. Developed a secure IMEI registration system and an anonymous chat feature allowing finders to contact owners without compromising privacy.\", \"tech\": [\"React\", \"Express.js\", \"ESP32 (Microcontroller)\", \"Node.js\", \"Vercel\", \"REST API\"], \"title\": \"Find My Device\"}, {\"id\": 2, \"desc\": \"A personalized fashion recommendation web app using personality and user input to suggest styles, powered by Gemini API. Built with a responsive UI and Tailwind CSS, with secure API logic to preserve key integrity.\", \"tech\": [\"React\", \"TypeScript\", \"Tailwind CSS\", \"REST API\"], \"title\": \"Garcia\"}, {\"id\": 3, \"desc\": \"A web-based clone of the popular Codenames board game, featuring real-time, two-team multiplayer gameplay. Developed a full-stack application to manage game state, player roles (Spymaster and Operative), and turn-based logic, ensuring a synchronized experience for all users.\", \"tech\": [\"React.js\", \"Node.js\", \"Express.js\", \"Socket.io\", \"MySql\"], \"title\": \"Codenames - Multiplayer Word Game\"}], \"education\": [{\"id\": 1, \"desc\": \"\", \"years\": \"2023 – 2027\", \"degree\": \"Bachelor of Engineering in CSE (IoT, Cybersecurity & Blockchain)\", \"school\": \"Lokmanya Tilak College of Engineering\"}, {\"id\": 1788089655818, \"years\": \"2021-2023\", \"degree\": \"Science (PCMB)\", \"school\": \"Global Juniour College\"}], \"experience\": [], \"certifications\": [{\"id\": 1, \"year\": \"2025\", \"title\": \"AI/ML Workshop\", \"issuer\": \"TechXcelerate\"}, {\"id\": 1788094435125, \"year\": \"2025\", \"title\": \"Java\", \"issuer\": \"NPTEL\"}]}'),(5,3,'Untitled Portfolio','Minimalist','2026-08-30 13:23:32','2026-08-30 14:42:29','{\"intro\": {\"name\": \"Rayyan Ansari\", \"title\": \"Computer Engineering Student\", \"summary\": \"Computer Engineering student with hands-on experience building full-stack web, mobile, and AI-powered applications using modern technologies including React, Next.js, Node.js, TypeScript, Python, PostgreSQL, and cloud-based services. Experienced in developing scalable applications, designing REST APIs, working with databases, and integrating AI capabilities into software solutions. Strong foundation in software engineering principles with a continuous focus on learning, problem solving, and building reliable, real-world applications.\", \"photoUrl\": \"https://4zxl3477-5000.inc1.devtunnels.ms/uploads/1788096266563-4910334-dc19e610-67c7-4b3e-b4b6-553b15f754d3.jpg\"}, \"skills\": [\"Python\", \"C\", \"Java\", \"TypeScript\", \"JavaScript\", \"Kotlin\", \"React.js\", \"Next.js 15\", \"React Native (Expo)\", \"Tailwind CSS\", \"HTML\", \"Vite\", \"Framer Motion\", \"Recharts\", \"Node.js\", \"Express.js\", \"REST APIs\", \"JWT Authentication\", \"bcryptjs\", \"Multer\", \"MongoDB\", \"PostgreSQL\", \"Redis\", \"Prisma ORM\", \"Supabase\", \"Firebase\", \"RAG Pipelines\", \"Pinecone\", \"Groq SDK\", \"scikit-learn\", \"TensorFlow\", \"PyTorch\", \"BERT\", \"Git\", \"GitHub\", \"Docker\", \"Vercel\", \"AWS (EC2)\", \"Postman\", \"Figma\", \"WordPress\", \"Bluetooth Low Energy (BLE)\", \"Arduino (IoT sensors)\", \"Expo Task Manager\", \"Android Services\"], \"contact\": {\"email\": \"rayyanansari3003@gmail.com\", \"github\": \"github.com/RayyanKimoi\", \"linkedin\": \"linkedin.com/in/rayyan-ansari3003\"}, \"visible\": {\"skills\": true, \"projects\": true, \"education\": true, \"experience\": false, \"certifications\": true}, \"projects\": [{\"id\": 1, \"desc\": \"Led the design and development of a React Native mobile app and companion React web dashboard for a crowdsourced lost-device recovery platform, where nearby users running the app anonymously detect BLE signals from registered lost devices and securely relay encrypted locations, enabling owners to locate devices even without GPS, internet connectivity, or a SIM card.\\nImplemented BLE advertising and background scanning using Expo Task Manager and Android foreground services for continuous low-power detection, and built a secure real-time location reporting pipeline using Supabase (RLS)\", \"tech\": [\"React Native (Expo)\", \"React\", \"TypeScript\", \"Supabase\", \"BLE\", \"Web\"], \"title\": \"SPORS\"}, {\"id\": 2, \"desc\": \"Led development of a governed academic AI platform featuring a curriculum-aware AI tutor with gamified learning (XP, Boss Battles, leaderboards) and role-based dashboards.\\nContributed in engineering a RAG pipeline embedding curriculum PDFs into Pinecone and constraining AI Tutor LLM responses to approved academic material, reducing hallucinated responses while also adding a feature to generate flowcharts.\", \"tech\": [\"Next.js 15\", \"TypeScript\", \"Express.js\", \"PostgreSQL\", \"Prisma\", \"Pinecone (RAG)\", \"Redis\", \"Groq SDK\"], \"title\": \"IntelliCampus\"}, {\"id\": 3, \"desc\": \"Built an AI-powered career guidance platform that recommends personalized career paths based on user’s responses, analyzes resumes and provides preparation resources and tools including an ATS Resume Checker and AI career chatbot.\\nLed full-stack development and built the React frontend, implemented Node.js REST APIs, and developed backend logic that parses uploaded PDFs and scores resumes against job descriptions using an LLM.\", \"tech\": [\"React\", \"Node.js\", \"MongoDB\", \"JWT\", \"Groq SDK\"], \"title\": \"Smart Career Path Dashboard\"}, {\"id\": 4, \"desc\": \"Built a Multinomial Naive Bayes spam classifier from scratch in Python – implemented log-likelihood scoring, Laplacian smoothing, and TF-IDF weighting (no ML libraries) to classify SMS messages as spam or ham.\\nAchieved 97.5% accuracy on unseen data with full confusion matrix output; model artifacts persisted as JSON for reusable inference without retraining.\", \"tech\": [\"Python\", \"Naive Bayes\", \"TF-IDF\", \"Pandas\", \"JSON\"], \"title\": \"Message Spam Filter\"}], \"education\": [{\"id\": 1, \"desc\": \"\", \"years\": \"Expected 2027\", \"degree\": \"B.E. in Computer Engineering, Honors in Cybersecurity\", \"school\": \"Vasantdada Patil Pratishthan’s College of Engineering\"}], \"experience\": [{\"id\": 1788096277205, \"desc\": \"\", \"role\": \"Prostitute\", \"years\": \"2010-PRESENT\", \"company\": \"\"}], \"certifications\": [{\"id\": 1, \"year\": \"\", \"title\": \"Python Bootcamp\", \"issuer\": \"Udemy\"}, {\"id\": 2, \"year\": \"\", \"title\": \"Udemy Full Stack Development with MERN and GenAI\", \"issuer\": \"Udemy\"}, {\"id\": 1788096567274, \"year\": \"2026\", \"title\": \"Cyber sec\", \"issuer\": \"vpppcoe\"}]}');
/*!40000 ALTER TABLE `portfolios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Raghavendra Ramesh Singh','raghavendrarameshsingh@gmail.com','$2b$10$VO8v6mRwtYlx3dae.VZTXOYfVmUyRUssI1KH6m2uzmvgBJUMc2qwe','2026-08-29 18:24:14'),(2,'krish Sah','krrish@gmail.com','$2b$10$fTkbylDaV8nqxEzhY22NUeAjRex5oykeSB71r1zw1s.TBTXkH1Hzq','2026-08-29 19:09:14'),(3,'SID','siddheshachrekar.06@gmail.com','$2b$10$Zyn2Gw0XSgUJXg3ARVbTH.oDk.VwKltm15W9nz1NXzufY6cYOLeJu','2026-08-30 13:21:54'),(4,'krrish','krrishsah05@gmail.com','$2b$10$VqT8Zm0jtJ6HTX/fctB0IeTGM24FMoUPM5bT8b0qYYfqr/9ZHuDp2','2026-08-30 13:21:58');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'secondlife_resume'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-30 20:23:00
