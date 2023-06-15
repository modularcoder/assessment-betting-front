import { cn } from '@/_services/utilsService'

function BaseSkeleton({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				'animate-pulse rounded-md bg-slate-50 bg-opacity-30',
				className,
			)}
			{...props}
		/>
	)
}

export default BaseSkeleton
