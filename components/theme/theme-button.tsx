'use client';

import { useTheme } from 'next-themes';

interface ThemeButtonProps {
	children: React.ReactNode;
	defaultTheme?: string;
}
export const ThemeButton = ({ children }: ThemeButtonProps) => {
	const { theme, setTheme } = useTheme();
	const changeTheme = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark');
	};

	return (
		<span onClick={changeTheme} className='cursor-pointer'>
			{children}
		</span>
	);
};
