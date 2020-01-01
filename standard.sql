/*
Navicat MySQL Data Transfer

Source Server         : DevTeam_User1
Source Server Version : 50635
Source Host           : 10.14.10.114:3306
Source Database       : standard_api_demo

Target Server Type    : MYSQL
Target Server Version : 50635
File Encoding         : 65001

Date: 2019-11-22 09:42:31
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `standard_api_api`
-- ----------------------------
DROP TABLE IF EXISTS `standard_api_api`;
CREATE TABLE `standard_api_api` (
`id`  int(11) NOT NULL AUTO_INCREMENT ,
`path`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
`name`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
`status`  int(1) NOT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=7

;

-- ----------------------------
-- Records of standard_api_api
-- ----------------------------
BEGIN;
INSERT INTO `standard_api_api` VALUES ('1', '/api/test1', 'abc', '0'), ('2', '/api/test2', 'a', '1'), ('3', '/api/test3', 'a', '2'), ('4', '/api/test4', 'a', '1'), ('5', '/api/test5', 'a', '0'), ('6', '/a/b', '2', '0');
COMMIT;

-- ----------------------------
-- Table structure for `standard_api_system`
-- ----------------------------
DROP TABLE IF EXISTS `standard_api_system`;
CREATE TABLE `standard_api_system` (
`id`  int(11) NOT NULL AUTO_INCREMENT ,
`name`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
`status`  int(1) NOT NULL ,
`system_id`  varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=3

;

-- ----------------------------
-- Records of standard_api_system
-- ----------------------------
BEGIN;
INSERT INTO `standard_api_system` VALUES ('1', '小易', '0', 'sss'), ('2', '小易1', '1', 'aaa');
COMMIT;

-- ----------------------------
-- Table structure for `standard_api_system_api_mapping`
-- ----------------------------
DROP TABLE IF EXISTS `standard_api_system_api_mapping`;
CREATE TABLE `standard_api_system_api_mapping` (
`id`  int(11) NOT NULL AUTO_INCREMENT ,
`api_id`  int(255) NULL DEFAULT NULL ,
`system_id`  int(11) NULL DEFAULT NULL ,
PRIMARY KEY (`id`),
FOREIGN KEY (`api_id`) REFERENCES `standard_api_api` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
FOREIGN KEY (`system_id`) REFERENCES `standard_api_system` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
INDEX `api` (`api_id`) USING BTREE ,
INDEX `system` (`system_id`) USING BTREE 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=7

;

-- ----------------------------
-- Records of standard_api_system_api_mapping
-- ----------------------------
BEGIN;
INSERT INTO `standard_api_system_api_mapping` VALUES ('2', '2', '1'), ('3', '3', '1'), ('4', '4', '1');
COMMIT;

-- ----------------------------
-- Table structure for `standard_api_system_config`
-- ----------------------------
DROP TABLE IF EXISTS `standard_api_system_config`;
CREATE TABLE `standard_api_system_config` (
`id`  int(11) NOT NULL AUTO_INCREMENT ,
`system_id`  int(11) NULL DEFAULT NULL ,
`access_key`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`access_secret`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`expired_time`  datetime NULL DEFAULT NULL ,
PRIMARY KEY (`id`),
FOREIGN KEY (`system_id`) REFERENCES `standard_api_system` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
INDEX `system_id` (`system_id`) USING BTREE 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=6

;

-- ----------------------------
-- Records of standard_api_system_config
-- ----------------------------
BEGIN;
INSERT INTO `standard_api_system_config` VALUES ('1', '1', 'A87DASDW2A', '123456', '2019-04-26 00:00:00'), ('2', '2', 'DDDD', '222', '2018-11-01 16:09:22'), ('3', '1', 'dadaa2222222', '1111ddd', '2019-03-19 00:00:00'), ('4', '1', 'dadaa2222222', '1111', '2019-03-19 00:00:00'), ('5', '1', 'asddsa', 'qweewq', '2019-10-03 00:00:00');
COMMIT;

-- ----------------------------
-- Auto increment value for `standard_api_api`
-- ----------------------------
ALTER TABLE `standard_api_api` AUTO_INCREMENT=7;

-- ----------------------------
-- Auto increment value for `standard_api_system`
-- ----------------------------
ALTER TABLE `standard_api_system` AUTO_INCREMENT=3;

-- ----------------------------
-- Auto increment value for `standard_api_system_api_mapping`
-- ----------------------------
ALTER TABLE `standard_api_system_api_mapping` AUTO_INCREMENT=7;

-- ----------------------------
-- Auto increment value for `standard_api_system_config`
-- ----------------------------
ALTER TABLE `standard_api_system_config` AUTO_INCREMENT=6;
