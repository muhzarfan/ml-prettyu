const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');

async function postPredictHandler(request, h) {
    const { image } = request.payload;
    const { model } = request.server.app;

    const { confidenceScore, label, explanation, suggestion } = await predictClassification(model, image);

    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
 
    const data = {
        "id": id,
        "result": label,
        "explanation": explanation,
        "suggestion": suggestion,
        "confidenceScore": confidenceScore,
        "createdAt": createdAt
    }

    const response = h.response({
        status: 'success',
        message: confidenceScore > 99 ? 'Model berhasil diprediksi.' : 'Model berhasil diprediksi, tetapi berada di bawah ambang batas. Silakan gunakan gambar yang benar',
        data
    })
    response.code(201);
    return response;
}
   
module.exports = postPredictHandler;