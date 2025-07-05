import { JobsService } from './jobs.service';

export function startJobProcessor(jobsService: JobsService) {
  setInterval(() => {
    void (async () => {
      const job = jobsService.getNextPending();
      if (job) {
        console.log(`Processing job: ${job.id}`);
        jobsService.update(job.id, { status: 'Processing' });

        const success = Math.random() > 0.2;
        await new Promise((r) => setTimeout(r, 3000));

        jobsService.update(job.id, {
          status: 'Complete',
          result: success ? 'Success' : 'Fail',
          output: success
            ? `Processed: ${job.prompt}`
            : 'Error running browser agent',
        });
      }
    })();
  }, 2000);
}
