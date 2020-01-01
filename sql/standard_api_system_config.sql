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

 Date: 06/03/2019 10:05:35
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for standard_api_system_config
-- ----------------------------
DROP TABLE IF EXISTS `standard_api_system_config`;
CREATE TABLE `standard_api_system_config`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `system_id` int(11) NULL DEFAULT NULL,
  `access_key` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `access_secret` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `expired_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `system_id`(`system_id`) USING BTREE,
  CONSTRAINT `system_id` FOREIGN KEY (`system_id`) REFERENCES `standard_api_system` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

SET FOREIGN_KEY_CHECKS = 1;
