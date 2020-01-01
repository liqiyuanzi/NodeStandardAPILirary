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

 Date: 06/03/2019 10:05:29
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for standard_api_system_api_mapping
-- ----------------------------
DROP TABLE IF EXISTS `standard_api_system_api_mapping`;
CREATE TABLE `standard_api_system_api_mapping`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `api_id` int(255) NULL DEFAULT NULL,
  `system_id` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `api`(`api_id`) USING BTREE,
  INDEX `system`(`system_id`) USING BTREE,
  CONSTRAINT `api` FOREIGN KEY (`api_id`) REFERENCES `standard_api_api` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `system` FOREIGN KEY (`system_id`) REFERENCES `standard_api_system` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 102 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

SET FOREIGN_KEY_CHECKS = 1;
