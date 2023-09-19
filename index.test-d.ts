import { expectType } from 'tsd';
import utility from '.';
import { randomSlice } from './array';
import { logDate } from './date';

expectType<any[]>(utility.randomSlice([]));
expectType<string[]>(utility.randomSlice<string>([]));
expectType<any[]>(randomSlice([]));
expectType<string[]>(randomSlice<string>([]));

expectType<string>(utility.logDate());
expectType<string>(utility.logDate('foo'));
expectType<string>(utility.logDate(new Date()));
expectType<string>(utility.logDate(new Date(), 'foo'));
expectType<string>(logDate());
expectType<string>(logDate('foo'));
expectType<string>(logDate(new Date()));
expectType<string>(logDate(new Date(), 'foo'));
