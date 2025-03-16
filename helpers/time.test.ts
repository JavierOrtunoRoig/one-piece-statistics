import { describe, it, expect } from 'vitest';
import {
  getTime,
  flattenVideosObject,
  getArcTime,
  getArcWatchedTime,
  getArcRemainingTime,
  getArcTotalTime,
  getSagaTotalTime,
  getSerieTotalTime,
} from './time'; // Asegúrate de que el path es correcto
import mockData from './mockData.json';

describe('getTime', () => {
  it('should correctly format short durations in long format', () => {
    expect(getTime(45, { type: 'long' })).toBe('0 minutes and 45 seconds');
    expect(getTime(75, { type: 'long' })).toBe('1 minutes and 15 seconds');
  });

  it('should correctly format long durations in long format', () => {
    expect(getTime(3600, { type: 'long' })).toBe(
      '1 hours, 0 minutes and 0 seconds',
    );
    expect(getTime(3665, { type: 'long' })).toBe(
      '1 hours, 1 minutes and 5 seconds',
    );
  });

  it('should correctly format short durations in short format', () => {
    expect(getTime(45, { type: 'short' })).toBe('0h 0m 45s');
    expect(getTime(75, { type: 'short' })).toBe('0h 1m 15s');
  });

  it('should correctly format long durations in short format', () => {
    expect(getTime(3600, { type: 'short' })).toBe('1h 0m 0s');
    expect(getTime(3665, { type: 'short' })).toBe('1h 1m 5s');
  });

  it('should handle edge cases like 0 seconds', () => {
    expect(getTime(0, { type: 'long' })).toBe('0 minutes and 0 seconds');
    expect(getTime(0, { type: 'short' })).toBe('0h 0m 0s');
  });
});

describe('flattenVideosObject', () => {
  it('should flatten a nested video object into an array', () => {
    const result = flattenVideosObject(mockData);
    expect(result).toHaveLength(40);
    expect(result.slice(0, 3)).toEqual([
      { title: 'Romance Dawn 01', duration: 1077.42, watched: true },
      { title: 'Romance Dawn 02', duration: 1259.56, watched: false },
      { title: 'Romance Dawn 03', duration: 1654.38, watched: false },
    ]);
  });

  it('should return an empty array if input is an empty object', () => {
    expect(flattenVideosObject({})).toEqual([]);
  });
});

describe('getArcTime', () => {
  it('should return the total formatted duration for an arc', () => {
    expect(getArcTime(mockData['1. East Blue']['1.1. Romance Dawn'])).toBe(
      '1 hours, 24 minutes and 29 seconds',
    );
  });

  it('should return 0 minutes and 0 seconds if the arc is empty', () => {
    expect(getArcTime({})).toBe('0 minutes and 0 seconds');
  });
});

describe('getArcWatchedTime', () => {
  it('should return the total formatted watched duration for an arc', () => {
    expect(
      getArcWatchedTime(mockData['1. East Blue']['1.1. Romance Dawn']),
    ).toBe('35 minutes and 55 seconds');
  });

  it('should return 0 minutes and 0 seconds if the arc is empty', () => {
    expect(getArcWatchedTime({})).toBe('0 minutes and 0 seconds');
  });
});

describe('getArcRemainingTime', () => {
  expect(
    getArcRemainingTime(mockData['1. East Blue']['1.1. Romance Dawn']),
  ).toBe('48 minutes and 33 seconds');

  it('should return 0 minutes and 0 seconds if the arc is empty', () => {
    expect(getArcRemainingTime({})).toBe('0 minutes and 0 seconds');
  });
});

describe('getArcTotalTime', () => {
  it('should calculate the total duration of an arc', () => {
    expect(getArcTotalTime(mockData['1. East Blue']['1.1. Romance Dawn'])).toBe(
      5069.52,
    );
  });

  it('should return 0 for an empty array', () => {
    expect(getArcTotalTime([])).toBe(0);
  });

  it('should handle an arc with a single episode', () => {
    expect(
      getArcTotalTime([{ title: 'Episode 1', duration: 1500, watched: true }]),
    ).toBe(1500);
  });
});

describe('getSagaTotalTime', () => {
  it('should calculate the total duration of a saga', () => {
    expect(getSagaTotalTime(mockData['1. East Blue'])).toBe(10266.23);
  });

  it('should return 0 for an empty saga', () => {
    expect(getSagaTotalTime({})).toBe(0);
  });
});

describe('getSerieTotalTime', () => {
  it('should calculate the total duration of a series', () => {
    expect(getSerieTotalTime(mockData)).toBe(63043.9);
  });

  it('should return 0 for an empty series', () => {
    expect(getSerieTotalTime({})).toBe(0);
  });
});
