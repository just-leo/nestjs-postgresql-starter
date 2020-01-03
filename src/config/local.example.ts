/**
 * App config overrides
 * Takes effect on non-production environment only
 */
export default {
  typeOrmConfig: {
    logging: ['error', 'warn', 'info', 'schema'], // 'schema', 'log', 'query'
    maxQueryExecutionTime: 1000, // log queries that take too much time to execution
  },
};
