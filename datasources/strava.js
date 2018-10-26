import { RESTDataSource } from 'apollo-datasource-rest';

export class StravaAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.STRAVA_URL;
  }

  willSendRequest(request) {
    request.headers.set('Authorization', `Bearer ${process.env.STRAVA_TOKEN}`);
  }

  async getActivities() {
    return this.get('athlete/activities');
  }

  async getActivity(id) {
    const result = await this.get('activities', {
      id
    });

    return result;
  }
};
