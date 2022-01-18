import { Dept } from 'src/entities';

/*
 * @Author: jack-pearson
 * @Date: 2022-01-17 17:40:01
 * @LastEditTime: 2022-01-17 17:43:21
 * @LastEditors: jack-pearson
 * @FilePath: /server-cluster/src/utils/dept/index.ts
 * @Description:
 */
export const deptArrayToTree = (deptArray: Dept[]) => {
  const deptMap = new Map();
  deptArray.forEach((dept) => {
    deptMap.set(dept.id, dept);
  });
  const tree: Dept[] = [];
  deptArray.forEach((dept) => {
    const parent = deptMap.get(dept.parentId);
    if (parent) {
      (parent.children || (parent.children = [])).push(dept);
    } else {
      tree.push(dept);
    }
  });
  return tree;
};
