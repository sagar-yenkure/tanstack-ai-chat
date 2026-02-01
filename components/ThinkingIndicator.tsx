
const ThinkingIndicator = () => {
    return (
        <div className="flex animate-fade-in items-start gap-3 w-fit">
            <div className="flex-1 rounded-2xl bg-muted px-4 py-3">
                <div className="flex items-center gap-1">
                    <span className="text-sm text-muted-foreground">generating</span>
                    <span className="animate-pulse">.</span>
                    <span className="animate-pulse animation-delay-200">.</span>
                    <span className="animate-pulse animation-delay-400">.</span>
                </div>
            </div>
        </div>
    )
}

export default ThinkingIndicator