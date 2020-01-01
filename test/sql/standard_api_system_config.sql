/*
 Navicat MySQL Data Transfer

 Source Server         : srv-shdu-d03
 Source Server Type    : MySQL
 Source Server Version : 50635
 Source Host           : srv-shdu-d03:3306
 Source Schema         : aaa

 Target Server Type    : MySQL
 Target Server Version : 50635
 File Encoding         : 65001

 Date: 22/02/2019 11:11:47
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for common_system_config
-- ----------------------------
DROP TABLE IF EXISTS `common_system_config`;
CREATE TABLE `common_system_config`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `system_id` int(11) NULL DEFAULT NULL,
  `access_key` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `access_secret` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `expired_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `system_id`(`system_id`) USING BTREE,
  CONSTRAINT `system_id` FOREIGN KEY (`system_id`) REFERENCES `common_system` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of common_system_config
-- ----------------------------
INSERT INTO `common_system_config` VALUES (1, 1, 'A87DASDW2A', '123456', '2019-02-28 17:29:13');
INSERT INTO `common_system_config` VALUES (2, 2, 'DDDD', '222', '2018-11-01 16:09:22');

SET FOREIGN_KEY_CHECKS = 1;
