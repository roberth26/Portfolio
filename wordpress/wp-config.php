<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'portfolio_v2_wp');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', '');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'GNF/-i:,j5->M;* HoV4#i[&4`gJVV]G&~|SC6jNU<DVXUebg@L%.[q@p.?^s(OI');
define('SECURE_AUTH_KEY',  'oIHqMZIf{tEQMG_)#4WK5bd+vX=|a-6QA%!|fR#Ky[0l~c7s|83rx_KQ?-1t9)s]');
define('LOGGED_IN_KEY',    '!D2;p^d8`:k*tKnI_Z 8L+r+$dg_q/O4A6@+YP$g8b^Iak7B^[*6UsD9AF.0!$& ');
define('NONCE_KEY',        'c`<KRcEIb#-pCZtj}EiUnn#F>-$P1uBTp04ouo^la6-|^K]e!1SD1n+;/l++QBE8');
define('AUTH_SALT',        '&wn-|mGg<COZ /`38][>o%4Y3t<96xu5Fn&7,*W8<a]8|N)i&b2squY2i_^Vk-eg');
define('SECURE_AUTH_SALT', 'o-lPD`/|,OWh8F&d($qvCR=F!>NL=AzI/=}F%qulRRAG+$~%Pva,wp%Px7Yp=Z}3');
define('LOGGED_IN_SALT',   '!Q5vZ($^bypc^Z$-7KhL2Hh}XseMg!ny%B,KH0!@yo#:$Jymxne98KYL5~a<pnEQ');
define('NONCE_SALT',       '0XgUuwMYzzc6I{+#c,5?xI;^Xyc#x-aN|[K?F,+]m:-5Ym|e?sW}nj4cgl7o]%|K');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');