import EventEmitter from 'events';

export const emitter = new EventEmitter();

export const _DEV_ = process.env.NODE_ENV === 'dev';

export const basePath = process.env.NODE_ENV === 'dev'?'/':'/upms-web/';
