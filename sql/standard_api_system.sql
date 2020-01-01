/*
 Navicat MySQL Data Transfer

 Source Server         : srv-shdu-d03
 Source Server Type    : MySQL
 Source Server Version : 50635
 Source Host           : srv-shdu-d03:3306
 Source Schema         : standard_api_demo

 Target Server Type    : MySQL
 Target Server Version : 50635
 File Encoding         : 65001

 Date: 06/03/2019 10:05:09
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for standard_api_system
-- ----------------------------
DROP TABLE IF EXISTS `standard_api_system`;
CREATE TABLE `standard_api_system`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `status` int(1) NOT NULL,
  `system_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

SET FOREIGN_KEY_CHECKS = 1;
