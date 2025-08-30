/**
 * Validate user input for character creation
 */
function validateCharacterData(character) {
    const errors = [];

    if (!character.race) {
        errors.push('Race is required');
    }

    if (!character.origin) {
        errors.push('Origin is required');
    }

    if (!character.dream) {
        errors.push('Dream is required');
    }

    return errors;
}

/**
 * Validate quest progression data
 */
function validateQuestData(progression) {
    const errors = [];

    if (!progression.msq) {
        errors.push('Main story quest data missing');
    } else {
        if (!progression.msq.saga) errors.push('Quest saga missing');
        if (!progression.msq.arc) errors.push('Quest arc missing');
        if (!progression.msq.origin) errors.push('Quest origin missing');
        if (!progression.msq.step) errors.push('Quest step missing');
    }

    if (!progression.location) {
        errors.push('Player location missing');
    }

    return errors;
}

/**
 * Sanitize user input to prevent injection attacks
 */
function sanitizeInput(input) {
    if (typeof input !== 'string') return input;

    return input
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/[<>&"']/g, '') // Remove potentially dangerous characters
        .trim()
        .substring(0, 100); // Limit length
}

module.exports = {
    validateCharacterData,
    validateQuestData,
    sanitizeInput
};