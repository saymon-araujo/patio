/**
 * Calendar Picker Component
 * Date range selection for rentals and availability
 */

import React from 'react';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import CalendarPicker from 'react-native-calendar-picker';

interface CalendarPickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onDateChange: (start: Date | null, end: Date | null) => void;
  blockedDates?: Date[];
  allowRangeSelection?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

export function CalendarPickerComponent({
  startDate,
  endDate,
  onDateChange,
  blockedDates = [],
  allowRangeSelection = true,
  minDate = new Date(),
  maxDate,
}: CalendarPickerProps) {
  const handleDateChange = (date: any, type: string) => {
    if (type === 'END_DATE') {
      onDateChange(startDate, date);
    } else {
      if (!allowRangeSelection) {
        onDateChange(date, date);
      } else {
        onDateChange(date, endDate);
      }
    }
  };

  // Convert blocked dates to disabled dates array
  const disabledDates = blockedDates.map((date) => date);

  return (
    <VStack className="gap-4">
      <Box className="bg-white rounded-lg">
        <CalendarPicker
          startFromMonday={true}
          allowRangeSelection={allowRangeSelection}
          minDate={minDate}
          maxDate={maxDate}
          selectedStartDate={startDate}
          selectedEndDate={endDate}
          onDateChange={handleDateChange}
          disabledDates={disabledDates}
          selectedDayColor="#0066FF" // primary-500
          selectedDayTextColor="#FFFFFF"
          todayBackgroundColor="#E6F4FE" // primary-50
          todayTextStyle={{ color: '#0066FF' }}
          textStyle={{
            fontFamily: 'Inter_400Regular',
            color: '#1F2937', // typography-800
          }}
          customDatesStyles={blockedDates.map((date) => ({
            date,
            style: { backgroundColor: '#F3F4F6' }, // background-100
            textStyle: { color: '#9CA3AF', textDecorationLine: 'line-through' }, // typography-400
          }))}
        />
      </Box>

      {/* Selected Range Display */}
      {startDate && (
        <Box className="bg-primary-50 p-3 rounded-lg">
          <HStack className="items-center justify-between">
            <VStack>
              <Text size="sm" className="text-typography-600">
                {allowRangeSelection ? 'Selected Range' : 'Selected Date'}
              </Text>
              <Text className="font-semibold text-primary-700">
                {startDate.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
                {endDate &&
                  allowRangeSelection &&
                  ` - ${endDate.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}`}
              </Text>
            </VStack>
            {endDate && allowRangeSelection && (
              <VStack>
                <Text size="sm" className="text-typography-600">
                  Duration
                </Text>
                <Text className="font-bold text-primary-700">
                  {Math.ceil(
                    (endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)
                  ) + 1}{' '}
                  days
                </Text>
              </VStack>
            )}
          </HStack>
        </Box>
      )}

      {blockedDates.length > 0 && (
        <Box className="bg-background-50 p-2 rounded">
          <Text size="xs" className="text-typography-500">
            Gray dates are unavailable
          </Text>
        </Box>
      )}
    </VStack>
  );
}
