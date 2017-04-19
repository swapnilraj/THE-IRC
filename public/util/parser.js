const parseResponse = (response) => {

    const translationsArray = response['0'];
    let x = '';
    x = x + translationsArray.map(e => {
        return(e['0']);
    });

    return x;
};