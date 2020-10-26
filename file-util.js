exports.readFile = filePath => {
    var fileContent = fs.readFileSync(filePath,{ encoding: 'utf-8' });

    return JSON.parse(fileContent);
}

exports.writeFile = (filePath, contentToWrite) => {
    fs.writeFileSync(filePath, contentToWrite, (err) => {
        if (err) throw err;
        console.log(`${contentToWrite} has been written to ${filePath}`);
    });
}