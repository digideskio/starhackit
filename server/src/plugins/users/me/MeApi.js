import _ from 'lodash';

let log = require('logfilename')(__filename);

export default function MeApi(app) {
  let models = app.data.models();

  return {
    async getByUserId(userId) {
      log.debug("index userId: ", userId);
      let user = await models.User.findByUserId(userId);
      log.debug("index user: ", user.get());
      return _.omit(user.toJSON(), 'id');
    },
    async patch(userId, data) {
      log.debug("patch userId %s, data: ", userId, data);
      await models.User.update({
        username: data.username
      }, {
        where: {
          id: userId
        }
      });
      log.debug("patch done");
      return data;
    }
  };
}
