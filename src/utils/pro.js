#!/usr/bin/env node

const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');
const shell = require('shelljs');
// 设置 命令行的一些样式
const init = () => {
  console.log(
    chalk.green(
      figlet.textSync('Nordon', {
        font: 'Ghost',
        horizontalLayout: 'default',
        verticalLayout: 'default'
      })
    )
  );
};

const isNeedVersion = () => {
  const questions = [
    {
      name: 'NEED_VERSION',
      type: 'list',
      message: '是否需要打包为正式版本并携带版本号',
      choices: ['需要', '不需要']
    }
  ];
  return inquirer.prompt(questions);
};

const stdinVersion = () => {
  const questions = [
    {
      name: 'VERSION',
      type: 'input',
      message: '请输入版本号'
    }
  ];

  return inquirer.prompt(questions);
};

const run = async () => {
  // 打印点东西玩
  init();

  // 是否需要版本号
  const { NEED_VERSION } = await isNeedVersion();

  // 需要
  if (NEED_VERSION === '需要') {
    while (true) {
      let { VERSION } = await stdinVersion();
      if (VERSION) {
        console.log(VERSION);
        break;
      }
    }
  }
  shell.exec('npm start').stdin;
};

run();
