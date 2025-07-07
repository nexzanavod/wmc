import { useState, useEffect } from "react";

// Facebook pages data
const FACEBOOK_PAGES = [
	{
		"fbId": "311447735387687",
		"name": "Heinrich & Co"
	},
	{
		"fbId": "292102770642451",
		"name": "Wingman Creative"
	},
	{
		"fbId": "144353618756048",
		"name": "The Smith Team"
	},
	{
		"fbId": "103468559329538",
		"name": "Housemark"
	},
	{
		"fbId": "115829181397449",
		"name": "Exp Realty Australia"
	},
	{
		"fbId": "104265792448858",
		"name": "Huhme Real Estate"
	},
	{
		"fbId": "2004541356534015",
		"name": "My Haus Property Group"
	},
	{
		"fbId": "331504026943769",
		"name": "Abode Construction"
	},
	{
		"fbId": "192873977396967",
		"name": "LJ Hooker Property Experience Central"
	},
	{
		"fbId": "689021464459783",
		"name": "LJ Hooker Boyne Tannum"
	},
	{
		"fbId": "203580165012946",
		"name": "Katie Lawley - Sales Executive"
	},
	{
		"fbId": "110761407956246",
		"name": "Brilliance Insurance Brokers company pvt ltd"
	},
	{
		"fbId": "156930554755259",
		"name": "Eva Frketic - The Agency South West"
	}
];

export default function FacebookPageBox({
	onAdd,
}: {
	onAdd?: (pages: Array<{ fbId: string; name: string }>) => void;
}) {
	const [selected, setSelected] = useState<Record<string, boolean>>({});

	const handleToggle = (fbId: string) => {
		setSelected((prev) => ({ ...prev, [fbId]: !prev[fbId] }));
	};

	useEffect(() => {
		const addedPages = FACEBOOK_PAGES
			.filter((page) => selected[page.fbId])
			.map(({ fbId, name }) => ({ fbId, name }));
		onAdd?.(addedPages);
	}, [selected, onAdd]);

	return (
		<div className="flex-1 p-6 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 flex flex-col items-center">
			<h4 className="font-semibold mb-4 text-gray-800 dark:text-white">
				Facebook Pages
			</h4>
			<table className="min-w-full mb-4">
				<thead>
					<tr>
						<th className="px-4 py-2 text-left text-gray-700 dark:text-white">
							Page Name
						</th>
						<th className="px-4 py-2 text-gray-700 dark:text-white">Add</th>
					</tr>
				</thead>
				<tbody>
					{FACEBOOK_PAGES.map((page) => (
						<tr key={page.fbId}>
							<td className="px-4 py-2 font-medium text-gray-800 dark:text-white">
								{page.name}
							</td>
							<td className="px-4 py-2 text-center">
								<input
									type="checkbox"
									checked={!!selected[page.fbId]}
									onChange={() => handleToggle(page.fbId)}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
