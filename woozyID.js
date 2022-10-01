const characters = 'bDfHjKlNpRtVxZAcEgIkMoQsUwY_0123456789-BdFhJkLnPrTvXzaCeGiKmOqSuW';

function woozyID(length) {
    let result = 0;
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    };

    return result;
};

module.exports = woozyID;