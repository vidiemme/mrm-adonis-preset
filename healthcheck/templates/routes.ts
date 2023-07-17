Route.get('health', async ({ response }) => {
    const report = await HealthCheck.getReport()

    return report.healthy
        ? response.ok(report)
        : response.badRequest(report)
})
