/*
 * @Author: jack-pearson
 * @Date: 2021-12-31 13:39:48
 * @LastEditTime: 2022-02-07 14:09:23
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
      const parent = findTreeItem(pre, cur.parentId);
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

export const findTreeItem = (menu: Menu[], id: number) => {
  let res: Menu;
  menu.forEach((item) => {
    if (item.id === id) {
      res = item;
    } else {
      if (item.children) {
        res = findTreeItem(item.children, id);
      }
    }
  });
  return res;
};
