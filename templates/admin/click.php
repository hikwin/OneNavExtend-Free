<!DOCTYPE html>
<html lang="zh-cn" xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta charset="utf-8" />
	<title><?php echo $link['title']; ?> - OneNav</title>
	<meta name="keywords" content="<?php echo $link['title']; ?>" />
	<meta name="description" content="<?php echo $link['description']; ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<?php if(getconfig('urlz')  == 'Privacy'){echo '<meta name="referrer" content="same-origin">'."\n";}?> 
	<link rel="stylesheet" href="<?php echo $libs?>/Other/bootstrap.min.css" type="" media=""/>
	<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
	<style>
		* {
			margin: 0;
			padding: 0;
			box-sizing: border-box;
		}
		
		body {
			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
			background: linear-gradient(135deg, #fefefe 0%, #f8f9fa 50%, #e9ecef 100%);
			min-height: 100vh;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 20px;
		}
		
		.container {
			max-width: 600px;
			width: 100%;
		}
		
		.card {
			background: rgba(255, 255, 255, 0.25);
			backdrop-filter: blur(20px);
			-webkit-backdrop-filter: blur(20px);
			border-radius: 24px;
			box-shadow: 0 25px 50px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(255, 255, 255, 0.3);
			border: 1px solid rgba(255, 255, 255, 0.2);
			overflow: hidden;
			animation: slideUp 0.6s ease-out;
		}
		
		@keyframes slideUp {
			from {
				opacity: 0;
				transform: translateY(30px);
			}
			to {
				opacity: 1;
				transform: translateY(0);
			}
		}
		
		.card-header {
			background: linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 100%);
			backdrop-filter: blur(15px);
			-webkit-backdrop-filter: blur(15px);
			color: #2c3e50;
			padding: 30px;
			text-align: center;
			position: relative;
			border-bottom: 1px solid rgba(255, 255, 255, 0.2);
		}
		
		.card-header::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="0.5" fill="%23ffffff" opacity="0.1"/><circle cx="75" cy="75" r="0.5" fill="%23ffffff" opacity="0.1"/><circle cx="50" cy="10" r="0.3" fill="%23ffffff" opacity="0.1"/><circle cx="10" cy="60" r="0.3" fill="%23ffffff" opacity="0.1"/><circle cx="90" cy="40" r="0.3" fill="%23ffffff" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
			opacity: 0.2;
		}
		
		.card-header h1 {
			font-size: 2rem;
			font-weight: 600;
			margin-bottom: 10px;
			position: relative;
			z-index: 1;
		}
		
		.card-header p {
			font-size: 1.1rem;
			opacity: 0.9;
			position: relative;
			z-index: 1;
		}
		
		.card-body {
			padding: 40px;
		}
		
		.link-info {
			background: rgba(255, 255, 255, 0.3);
			backdrop-filter: blur(10px);
			-webkit-backdrop-filter: blur(10px);
			border-radius: 20px;
			padding: 25px;
			margin-bottom: 30px;
			border-left: 4px solid rgba(255, 255, 255, 0.6);
			border: 1px solid rgba(255, 255, 255, 0.2);
		}
		
		.link-info h3 {
			color: #2c3e50;
			margin-bottom: 20px;
			font-size: 1.3rem;
			font-weight: 600;
		}
		
		.info-item {
			display: flex;
			align-items: center;
			margin-bottom: 15px;
			padding: 10px 0;
		}
		
		.info-item:last-child {
			margin-bottom: 0;
		}
		
		.info-label {
			font-weight: 600;
			color: #5a6c7d;
			min-width: 80px;
			margin-right: 15px;
		}
		
		.info-value {
			flex: 1;
			color: #2c3e50;
		}
		
		.url-link {
			color: #34495e;
			text-decoration: none;
			word-break: break-all;
			transition: color 0.3s ease;
		}
		
		.url-link:hover {
			color: #2c3e50;
			text-decoration: underline;
		}
		
		.countdown-container {
			text-align: center;
			margin: 30px 0;
		}
		
		.countdown {
			display: inline-flex;
			align-items: center;
			background: rgba(255, 255, 255, 0.4);
			backdrop-filter: blur(15px);
			-webkit-backdrop-filter: blur(15px);
			color: #2c3e50;
			padding: 20px 30px;
			border-radius: 50px;
			font-size: 1.2rem;
			font-weight: 600;
			box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.3);
			border: 1px solid rgba(255, 255, 255, 0.2);
			animation: pulse 2s infinite;
		}
		
		@keyframes pulse {
			0% { transform: scale(1); }
			50% { transform: scale(1.05); }
			100% { transform: scale(1); }
		}
		
		.countdown i {
			margin-right: 10px;
			font-size: 1.3rem;
		}
		
		.countdown-number {
			font-size: 1.5rem;
			margin: 0 5px;
			min-width: 30px;
			text-align: center;
		}
		
		.loading-spinner {
			display: inline-block;
			width: 20px;
			height: 20px;
			border: 3px solid rgba(255, 255, 255, 0.3);
			border-radius: 50%;
			border-top-color: white;
			animation: spin 1s ease-in-out infinite;
			margin-right: 10px;
		}
		
		@keyframes spin {
			to { transform: rotate(360deg); }
		}
		
		.backup-links {
			background: rgba(255, 255, 255, 0.3);
			backdrop-filter: blur(10px);
			-webkit-backdrop-filter: blur(10px);
			border-radius: 20px;
			padding: 25px;
			margin-top: 20px;
			border-left: 4px solid rgba(255, 255, 255, 0.6);
			border: 1px solid rgba(255, 255, 255, 0.2);
		}
		
		.backup-links h4 {
			color: #2c3e50;
			margin-bottom: 15px;
			font-size: 1.2rem;
		}
		
		.backup-link {
			display: block;
			background: rgba(255, 255, 255, 0.4);
			backdrop-filter: blur(8px);
			-webkit-backdrop-filter: blur(8px);
			padding: 15px 20px;
			margin-bottom: 10px;
			border-radius: 12px;
			text-decoration: none;
			color: #34495e;
			transition: all 0.3s ease;
			border: 1px solid rgba(255, 255, 255, 0.2);
		}
		
		.backup-link:hover {
			background: rgba(255, 255, 255, 0.6);
			color: #2c3e50;
			transform: translateY(-2px);
			box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
		}
		
		.backup-link:last-child {
			margin-bottom: 0;
		}
		
		.footer {
			text-align: center;
			margin-top: 30px;
			padding-top: 20px;
			border-top: 1px solid rgba(255, 255, 255, 0.2);
			color: #5a6c7d;
			font-size: 0.9rem;
		}
		
		.footer a {
			color: #34495e;
			text-decoration: none;
		}
		
		.footer a:hover {
			color: #2c3e50;
			text-decoration: underline;
		}
		
		/* 夜间模式样式 */
		body.dark-mode {
			background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #2d2d2d 100%);
		}
		
		body.dark-mode .card {
			background: rgba(20, 20, 20, 0.4);
			border: 1px solid rgba(255, 255, 255, 0.1);
			box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1);
		}
		
		body.dark-mode .card-header {
			background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
			color: #e8e8e8;
			border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		}
		
		body.dark-mode .card-header::before {
			background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="0.5" fill="%23ffffff" opacity="0.05"/><circle cx="75" cy="75" r="0.5" fill="%23ffffff" opacity="0.05"/><circle cx="50" cy="10" r="0.3" fill="%23ffffff" opacity="0.05"/><circle cx="10" cy="60" r="0.3" fill="%23ffffff" opacity="0.05"/><circle cx="90" cy="40" r="0.3" fill="%23ffffff" opacity="0.05"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
		}
		
		body.dark-mode .link-info {
			background: rgba(255, 255, 255, 0.08);
			border-left: 4px solid rgba(255, 255, 255, 0.2);
			border: 1px solid rgba(255, 255, 255, 0.08);
		}
		
		body.dark-mode .link-info h3 {
			color: #e8e8e8;
		}
		
		body.dark-mode .info-label {
			color: #b0b0b0;
		}
		
		body.dark-mode .info-value {
			color: #e8e8e8;
		}
		
		body.dark-mode .url-link {
			color: #cccccc;
		}
		
		body.dark-mode .url-link:hover {
			color: #ffffff;
		}
		
		body.dark-mode .countdown {
			background: rgba(255, 255, 255, 0.12);
			color: #e8e8e8;
			box-shadow: 0 15px 30px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1);
			border: 1px solid rgba(255, 255, 255, 0.1);
		}
		
		body.dark-mode .backup-links {
			background: rgba(255, 255, 255, 0.08);
			border-left: 4px solid rgba(255, 255, 255, 0.2);
			border: 1px solid rgba(255, 255, 255, 0.08);
		}
		
		body.dark-mode .backup-links h4 {
			color: #e8e8e8;
		}
		
		body.dark-mode .backup-link {
			background: rgba(255, 255, 255, 0.08);
			color: #cccccc;
			border: 1px solid rgba(255, 255, 255, 0.08);
		}
		
		body.dark-mode .backup-link:hover {
			background: rgba(255, 255, 255, 0.15);
			color: #ffffff;
		}
		
		body.dark-mode .footer {
			border-top: 1px solid rgba(255, 255, 255, 0.1);
			color: #b0b0b0;
		}
		
		body.dark-mode .footer a {
			color: #cccccc;
		}
		
		body.dark-mode .footer a:hover {
			color: #ffffff;
		}
		
		/* 模式切换按钮 */
		.theme-toggle {
			position: fixed;
			top: 20px;
			right: 20px;
			width: 50px;
			height: 50px;
			border-radius: 50%;
			background: rgba(255, 255, 255, 0.4);
			backdrop-filter: blur(15px);
			-webkit-backdrop-filter: blur(15px);
			border: 1px solid rgba(255, 255, 255, 0.2);
			box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
			cursor: pointer;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 1.2rem;
			color: #2c3e50;
			transition: all 0.3s ease;
			z-index: 1000;
		}
		
		.theme-toggle:hover {
			background: rgba(255, 255, 255, 0.6);
			transform: scale(1.1);
		}
		
		body.dark-mode .theme-toggle {
			background: rgba(255, 255, 255, 0.08);
			color: #e8e8e8;
			border: 1px solid rgba(255, 255, 255, 0.1);
			box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
		}
		
		body.dark-mode .theme-toggle:hover {
			background: rgba(255, 255, 255, 0.15);
		}
		
		/* 响应式设计 */
		@media (max-width: 768px) {
			body {
				padding: 10px;
			}
			
			.theme-toggle {
				top: 15px;
				right: 15px;
				width: 45px;
				height: 45px;
				font-size: 1.1rem;
			}
			
			.card-header {
				padding: 20px;
			}
			
			.card-header h1 {
				font-size: 1.5rem;
			}
			
			.card-header p {
				font-size: 1rem;
			}
			
			.card-body {
				padding: 20px;
			}
			
			.link-info {
				padding: 20px;
			}
			
			.info-item {
				flex-direction: column;
				align-items: flex-start;
			}
			
			.info-label {
				margin-bottom: 5px;
				min-width: auto;
			}
			
			.countdown {
				padding: 15px 25px;
				font-size: 1rem;
			}
			
			.countdown-number {
				font-size: 1.2rem;
			}
		}
		
		@media (max-width: 480px) {
			.theme-toggle {
				top: 10px;
				right: 10px;
				width: 40px;
				height: 40px;
				font-size: 1rem;
			}
			
			.card-header h1 {
				font-size: 1.3rem;
			}
			
			.card-body {
				padding: 15px;
			}
			
			.link-info {
				padding: 15px;
			}
			
			.countdown {
				padding: 12px 20px;
				font-size: 0.9rem;
			}
		}
	</style>
	<?php  
		//不存在多个链接的情况，如果用户已经登录，则1s后跳转，不然等5s
		if( empty($link['url_standby']) ) {
			if ($is_login) {
				$redirect_time = $adminST;
			}
			else{
				$redirect_time = $visitorST;
			}
		} else {
			$redirect_time = 0; // 有备用链接时不自动跳转
		}
	?>
</head>
<body>
	<!-- 模式切换按钮 -->
	<div class="theme-toggle" id="themeToggle" title="切换夜间模式">
		<i class="fas fa-moon" id="themeIcon"></i>
	</div>
	
	<div class="container">
		<div class="card">
			<div class="card-header">
				<h1><i class="fas fa-external-link-alt"></i> 正在跳转</h1>
				<p><?php echo htmlspecialchars($link['title']); ?></p>
			</div>
			
			<div class="card-body">
				<div class="link-info">
					<h3><i class="fas fa-info-circle"></i> 链接信息</h3>
					
					<div class="info-item">
						<div class="info-label">标题</div>
						<div class="info-value"><?php echo htmlspecialchars($link['title']); ?></div>
					</div>
					
					<?php if(!empty($link['description'])) { ?>
					<div class="info-item">
						<div class="info-label">描述</div>
						<div class="info-value"><?php echo htmlspecialchars($link['description']); ?></div>
					</div>
					<?php } ?>
					
					<div class="info-item">
						<div class="info-label">链接</div>
						<div class="info-value">
							<a href="<?php echo htmlspecialchars($link['url']); ?>" class="url-link" rel="nofollow" target="_blank">
								<?php echo htmlspecialchars($link['url']); ?>
							</a>
						</div>
					</div>
					
					<?php if(!empty($link['url_standby'])) { ?>
					<div class="info-item">
						<div class="info-label">备用链接</div>
						<div class="info-value">
							<a href="<?php echo htmlspecialchars($link['url_standby']); ?>" class="url-link" rel="nofollow" target="_blank">
								<?php echo htmlspecialchars($link['url_standby']); ?>
							</a>
						</div>
					</div>
					<?php } ?>
				</div>
				
				<?php if(empty($link['url_standby'])) { ?>
				<!-- 自动跳转倒计时 -->
				<div class="countdown-container">
					<div class="countdown" id="countdown">
						<i class="fas fa-clock"></i>
						<span>即将在 <span class="countdown-number" id="countdown-number"><?php echo $redirect_time; ?></span> 秒后跳转</span>
							</div>
							</div>
				<?php } else { ?>
				<!-- 备用链接选择 -->
				<div class="backup-links">
					<h4><i class="fas fa-link"></i> 请选择要访问的链接</h4>
					<a href="<?php echo htmlspecialchars($link['url']); ?>" class="backup-link" rel="nofollow" target="_blank">
						<i class="fas fa-globe"></i> 主链接：<?php echo htmlspecialchars($link['url']); ?>
					</a>
					<a href="<?php echo htmlspecialchars($link['url_standby']); ?>" class="backup-link" rel="nofollow" target="_blank">
						<i class="fas fa-shield-alt"></i> 备用链接：<?php echo htmlspecialchars($link['url_standby']); ?>
					</a>
				</div>
				<?php } ?>
				
				<div class="footer">
					<?php if($ICP != ''){echo '<a href="https://beian.miit.gov.cn" target="_blank">'.$ICP.'</a> | ';} ?>
					&copy;2022 Powered by <a href="https://gitee.com/tznb/OneNav" rel="nofollow" target="_blank">落幕</a>
					<?php $footer=getconfig("footer"); if($footer != ''&& ($Diy==='1' || $userdb['Level']=='999')){echo ' | '.htmlspecialchars_decode(base64_decode($footer));} ?>
					<?php if($Ofooter != ''){echo ' | '.$Ofooter;} ?>
				</div>
			</div>
		</div>
	</div>
	
	<script>
		// 主题切换功能
		class ThemeManager {
			constructor() {
				this.themeToggle = document.getElementById('themeToggle');
				this.themeIcon = document.getElementById('themeIcon');
				this.body = document.body;
				this.storageKey = 'onenav_theme_mode';
				this.init();
			}
			
			init() {
				// 从本地存储读取主题设置，默认为日间模式
				const savedTheme = localStorage.getItem(this.storageKey) || 'light';
				this.setTheme(savedTheme);
				
				// 绑定点击事件
				this.themeToggle.addEventListener('click', () => {
					this.toggleTheme();
				});
			}
			
			setTheme(theme) {
				if (theme === 'dark') {
					this.body.classList.add('dark-mode');
					this.themeIcon.className = 'fas fa-sun';
					this.themeToggle.title = '切换到日间模式';
				} else {
					this.body.classList.remove('dark-mode');
					this.themeIcon.className = 'fas fa-moon';
					this.themeToggle.title = '切换到夜间模式';
				}
				
				// 保存到本地存储
				localStorage.setItem(this.storageKey, theme);
			}
			
			toggleTheme() {
				const currentTheme = this.body.classList.contains('dark-mode') ? 'dark' : 'light';
				const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
				this.setTheme(newTheme);
			}
		}
		
		<?php if(empty($link['url_standby'])) { ?>
		// 倒计时功能
		let countdown = <?php echo $redirect_time; ?>;
		const countdownElement = document.getElementById('countdown-number');
		const countdownContainer = document.getElementById('countdown');
		
		function updateCountdown() {
			if (countdown > 0) {
				countdownElement.textContent = countdown;
				countdown--;
				setTimeout(updateCountdown, 1000);
			} else {
				// 跳转到目标链接
				countdownContainer.innerHTML = '<div class="loading-spinner"></div>正在跳转...';
				window.location.href = '<?php echo htmlspecialchars($link['url']); ?>';
			}
		}
		
		// 开始倒计时
		updateCountdown();
		<?php } ?>
		
		// 页面加载完成后初始化
		document.addEventListener('DOMContentLoaded', function() {
			// 初始化主题管理器
			new ThemeManager();
			
			// 添加页面加载动画
			const card = document.querySelector('.card');
			card.style.opacity = '0';
			card.style.transform = 'translateY(30px)';
			
			setTimeout(() => {
				card.style.transition = 'all 0.6s ease-out';
				card.style.opacity = '1';
				card.style.transform = 'translateY(0)';
			}, 100);
		});
	</script>
</body>
</html>