module.exports = function paginate(page, size){

    const validatedPage = parseInt(page, 10);
    const validatedSize = parseInt(size, 10);
    console.log("page, size: " + validatedPage, validatedSize);
    const offset = (validatedPage - 1) * validatedSize;
    
    return {validatedSize, offset};
    
}