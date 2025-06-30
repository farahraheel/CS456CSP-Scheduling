import { suggestMeetingTime } from '../csp/scheduler';
import dal from '../../2-utils/dal';
import { Rooms } from '../../4-models/meeting-model';

jest.mock('../../2-utils/dal');  // mock module dal

describe('CSP Meeting Scheduler - suggestMeetingTime', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should suggest a meeting time slot that does not conflict with existing meetings', async () => {
    // Mock booked meetings
    (dal.execute as jest.Mock).mockResolvedValue([
      {
        startTime: '2025-06-26 10:00:00',
        endTime: '2025-06-26 11:00:00',
        room: Rooms.RED,
      },
      {
        startTime: '2025-06-26 11:00:00',
        endTime: '2025-06-26 12:00:00',
        room: Rooms.BLUE,
      },
    ]);

    const teamId = 1;
    const suggestedSlot = await suggestMeetingTime(teamId);

    expect(suggestedSlot).not.toBeNull();

    if (suggestedSlot) {
      console.log('Suggested meeting slot:', suggestedSlot);

      const startHour = new Date(suggestedSlot.startTime).getHours();
      const endHour = new Date(suggestedSlot.endTime).getHours();

      expect(startHour).toBeGreaterThanOrEqual(9);
      expect(endHour).toBeLessThanOrEqual(17);

      const meetings = await dal.execute('SELECT startTime, endTime, room FROM meetings WHERE teamId = ?', [teamId]);
      const conflicts = meetings.filter((m: any) =>
        m.room === suggestedSlot.room &&
        !(suggestedSlot.endTime <= m.startTime || suggestedSlot.startTime >= m.endTime)
      );

      expect(conflicts.length).toBe(0);
    }
  });
});
