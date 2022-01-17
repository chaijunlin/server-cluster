/*
 * @Author: jack-pearson
 * @Date: 2021-12-31 13:39:48
 * @LastEditTime: 2022-01-14 18:55:52
 * @LastEditors: jack-pearson
 * @FilePath: /server-cluster/src/utils/menu/index.ts
 * @Description:
 */
import { Menu } from 'src/entities';

/**
 * @description: 菜单变成树形结构
 * @param {any} menu 菜单 list
 * @return {string} 树形结构
 */
export const dynamicRoutes = (menu: Menu[]) => {
  const res = menu.reduce((pre, cur) => {
    if (cur.parentId === 1) {
      pre.push({
        id: cur.id,
        parentId: cur.parentId,
        path: cur.path,
        name: cur.name,
        component: cur.component,
        redirect: cur.redirect,
        isHide: !!cur.isHide,
        meta: {
          title: cur.title,
          icon: cur.icon,
          isKeepAlive: !!cur.isKeepAlive,
          isTagView: !!cur.isTagView,
          isAffix: !!cur.isAffix,
        },
      });
    } else {
      const parent = pre.find((item) => item.id === cur.parentId);
      if (parent) {
        parent.children = parent.children || [];
        parent.children.push({
          id: cur.id,
          parentId: cur.parentId,
          path: cur.path,
          name: cur.name,
          component: cur.component,
          redirect: cur.redirect,
          isHide: !!cur.isHide,
          meta: {
            title: cur.title,
            icon: cur.icon,
            isKeepAlive: !!cur.isKeepAlive,
            isTagView: !!cur.isTagView,
            isAffix: !!cur.isAffix,
          },
        });
      }
    }
    return pre;
  }, []);
  return res;
};
