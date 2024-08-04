import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { debounce } from './debounce';

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should debounce a function', () => {
    const callback = vi.fn();
    const debouncedFunction = debounce(callback, 300);

    debouncedFunction();
    debouncedFunction();
    debouncedFunction();

    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(300);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should call the debounced function with the correct arguments', () => {
    const callback = vi.fn();
    const debouncedFunction = debounce(callback, 300);

    debouncedFunction('first call');
    debouncedFunction('second call');
    debouncedFunction('third call');

    vi.advanceTimersByTime(300);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('third call');
  });

  it('should debounce multiple calls correctly', () => {
    const callback = vi.fn();
    const debouncedFunction = debounce(callback, 300);

    debouncedFunction();
    vi.advanceTimersByTime(100);
    debouncedFunction();
    vi.advanceTimersByTime(100);
    debouncedFunction();
    vi.advanceTimersByTime(100);

    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(300);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should handle multiple debounced functions independently', () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();
    const debouncedFunction1 = debounce(callback1, 300);
    const debouncedFunction2 = debounce(callback2, 300);

    debouncedFunction1();
    debouncedFunction2();

    vi.advanceTimersByTime(300);

    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledTimes(1);
  });
});
