#!/usr/bin/env node

const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');
const shell = require('shelljs');

// 设置 命令行的一些样式
const init = () => {
  console.log(
    chalk.green(
      figlet.textSync('Frank', {
        font: 'Ghost',
        horizontalLayout: 'default',
        verticalLayout: 'default'
      })
    )
  );
};

const askQuestions = () => {
  const questions = [
    {
      name: 'FILENAME',
      type: 'input',
      message: '是否需要打包为正式版本并携带版本号?'
    },
    {
      type: 'list',
      name: 'EXTENSION',
      message: 'What is the file extension?',
      choices: ['.rb', '.js', '.php', '.css'],
      filter: function(val) {
        return val.split('.')[1];
      }
    }
  ];
  return inquirer.prompt(questions);
};

const createFile = (filename, extension) => {
  const filePath = `${process.cwd()}/${filename}.${extension}`;
  shell.touch(filePath);
  return filePath;
};

const success = filepath => {
  console.log(chalk.white.bgGreen.bold(`Done! File created at ${filepath}`));
};

const run = async () => {
  // 初始化
  init();

  // ask questions
  const answers = await askQuestions();
  const { FILENAME, EXTENSION } = answers;

  // create the file
  const filePath = createFile(FILENAME, EXTENSION);

  // show success message
  success(filePath);
};

run();
