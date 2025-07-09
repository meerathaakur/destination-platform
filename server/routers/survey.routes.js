import { Router } from "express";
import {
    getSurveyQuestions,
    submitSurveyResponse,
    getPersonalizedRecommendations
} from "../controllers/survey.controllers.js";
import { AuthenticationMW } from "../middlewares/auth.middleware.js";

const router = Router();

// Public route - get survey questions
router.get("/questions", getSurveyQuestions);

// Protected routes - require authentication
router.post("/submit", AuthenticationMW, submitSurveyResponse);
router.get("/recommendations", AuthenticationMW, getPersonalizedRecommendations);

export default router;
