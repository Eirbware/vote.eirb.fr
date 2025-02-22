import { CommandFactory } from 'nest-commander';
import { CliModule } from './cli.module';

async function bootstrap(): Promise<void> {
  try {
    await CommandFactory.run(CliModule, ['warn', 'error']);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error occurred while running CLI:', error.message);
    } else {
      console.error('Error occurred while running CLI:', error);
    }
    process.exit(1);
  }
}

void bootstrap();
