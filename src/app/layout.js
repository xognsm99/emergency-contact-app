import './globals.css';
import './sw-register';

export const metadata = {
	title: 'Emergency Contact - 긴급 연락처',
	description: '해외에서 긴급 상황 시 3초 안에 도움받기',
	manifest: '/manifest.json',
	themeColor: '#dc2626',
	appleWebApp: {
		capable: true,
		statusBarStyle: 'default',
		title: 'Emergency Contact',
	},
	viewport: {
		width: 'device-width',
		initialScale: 1,
		maximumScale: 1,
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang='ko'>
			<head>
				<link rel="manifest" href="/manifest.json" />
				<link rel="apple-touch-icon" href="/icon-192.png" />
				<meta name="theme-color" content="#dc2626" />
			</head>
			<body>
				<main>{children}</main>
			</body>
		</html>
	);
}

