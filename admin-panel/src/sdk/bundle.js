import games from './games.js';
import brands from './brands.js';
import users from './users.js';
import history from './history.js';
import activity from './activity.js';
import types from './types.js';
import socket from './socket.js';
import tools from './tools.js';

import platform from './platform.js';

import generalChat from './general/chat.js';

export default {
    games : games,
    brands : brands,
    users : users,
    history  : history,
    activity  :activity,
    types  :types,
    socket  :socket,
    tools : tools,
    platform : platform,
    general : {
        chat : generalChat
    }
}