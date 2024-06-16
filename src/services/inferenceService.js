const tf = require('@tensorflow/tfjs-node');

// konversi gambar menjadi tensor
async function predictClassification(model, image) {
    try {
        const tensor = tf.node
            .decodeJpeg(image)
            .resizeNearestNeighbor([224, 224])
            .expandDims()
            .toFloat()
    
        const prediction = model.predict(tensor);
        const score = await prediction.data();
        const confidenceScore = Math.max(...score) * 100;
    
        // class nanti diisi tipe kulit
        const classes = [''];
    
        const classResult = tf.argMax(prediction, 1).dataSync()[0];
        const label = classes[classResult];
    
        let explanation, suggestion;
    
        if (label === 'classes-tipekulit') {
            explanation = "tipe kulit anda bla bla bla."
            suggestion = "direkomendasikan anda untuk menggunakan skincare ini karena bla bla."
        }
    
        return { confidenceScore, label, explanation, suggestion };    
    } catch (error) {
        throw new InputError(`Terjadi kesalahan input: ${error.message}`)
    }

}

module.exports = predictClassification;