function StandardNavMenu() {
	return (
		<header className="bg-gray-900">
			<div className="flex items-center h-16 max-w-screen-xl gap-8 px-4 mx-auto sm:px-6 lg:px-8">
				<a className="block text-teal-300" href="/">
					<span className="sr-only">Home</span>
					<h1>REFERAL.IO</h1>
				</a>

				<div className="flex items-center justify-end flex-1 md:justify-between">
					<nav className="hidden md:block" aria-labelledby="header-navigation">
						<h2 className="sr-only" id="header-navigation">
							Header navigation
						</h2>
					</nav>

					<h3 className=" text-teal-300 flex items-center gap-4">
						Hi, Jonathan
					</h3>
				</div>
			</div>
		</header>
	);
}

export default StandardNavMenu;
