const { rejects, deepStrictEqual } = require('assert');

const File = require('./src/file');
const { error } = require('./src/constants');

(async () => {
  {
    const filePath = './mocks/empty-file-invalid.csv';

    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);

    await rejects(result, rejection);
  }
  {
    const filePath = './mocks/four-items-invalid.csv';

    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);

    await rejects(result, rejection);
  }
  {
    const filePath = './mocks/three-items-valid.csv';
    const result = await File.csvToJson(filePath);

    const expected = [
      {
        id: 123,
        name: 'Jean Cigoli',
        profession: 'Dev Nodejs',
        birthDay: 2000,
      },
      {
        id: 124,
        name: 'Erick Wendel',
        profession: 'Javascript Instructor',
        birthDay: 1997,
      },
      {
        id: 321,
        name: 'Lucas Santos',
        profession: 'Devops',
        birthDay: 2001,
      },
    ];

    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
  }
})();
