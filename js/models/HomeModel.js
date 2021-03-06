
import {API} from '../config/api'
import request from 'js/utils/request';
import {Toast} from 'antd-mobile'
import {createAction} from "../utils";
import Immutable from 'immutable';

import{
  changeBottomTab,//底部栏切换
  }  from '../constants/ActionTypes';

export default {
  namespace: 'tab',
  state: Immutable.fromJS({
      tabIndex:1
  }),
reducers: {
  /** 底部栏切换*/
  [changeBottomTab](state, { payload }){
        return state.set('tabIndex',payload);
    },
  },
effects: {

  },
}

