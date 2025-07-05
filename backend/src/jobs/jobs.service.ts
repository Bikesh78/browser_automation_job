import { Injectable } from '@nestjs/common';

export type Job = {
  id: string;
  prompt: string;
  status: 'Pending' | 'Processing' | 'Complete';
  result: 'Success' | 'Fail' | null;
  output: string | null;
};

@Injectable()
export class JobsService {
  private jobs: Job[] = [];

  create(prompt: string): Job {
    const job: Job = {
      id: crypto.randomUUID(),
      prompt,
      status: 'Pending',
      result: null,
      output: null,
    };
    this.jobs.push(job);
    return job;
  }

  findAll(): Job[] {
    return this.jobs;
  }

  findOne(id: string): Job | undefined {
    return this.jobs.find((job) => job.id === id);
  }

  update(id: string, updates: Partial<Job>) {
    const job = this.findOne(id);
    if (job) Object.assign(job, updates);
  }

  getNextPending(): Job | undefined {
    return this.jobs.find((j) => j.status === 'Pending');
  }
}
