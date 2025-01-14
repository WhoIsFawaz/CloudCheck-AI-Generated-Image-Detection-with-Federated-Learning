-- CreateTable
CREATE TABLE `User` (
    `UserID` INTEGER NOT NULL AUTO_INCREMENT,
    `Username` VARCHAR(255) NOT NULL,
    `Name` VARCHAR(255) NOT NULL,
    `Email` VARCHAR(255) NOT NULL,
    `Password` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `User_Username_key`(`Username`),
    UNIQUE INDEX `User_Email_key`(`Email`),
    PRIMARY KEY (`UserID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Insert example users
INSERT INTO `User` (`Username`, `Name`, `Email`, `Password`) VALUES
    ('jdoe', 'John Doe', 'johndoe@mail.com', '$2y$10$nPiCwjsSyRvQsz3JlnEStedKpEQL2uL0/IGlg182VGm0GplXU7zDe'),
    ('asmith', 'Alice Smith', 'alicesmith@mail.com', '$2y$10$nPiCwjsSyRvQsz3JlnEStedKpEQL2uL0/IGlg182VGm0GplXU7zDe'),
    ('bwhite', 'Bob White', 'bobwhite@mail.com', '$2y$10$nPiCwjsSyRvQsz3JlnEStedKpEQL2uL0/IGlg182VGm0GplXU7zDe'),
    ('cjones', 'Carol Jones', 'caroljones@mail.com', '$2y$10$nPiCwjsSyRvQsz3JlnEStedKpEQL2uL0/IGlg182VGm0GplXU7zDe'),
    ('djohnson', 'David Johnson', 'davidjohnson@mail.com', '$2y$10$nPiCwjsSyRvQsz3JlnEStedKpEQL2uL0/IGlg182VGm0GplXU7zDe');
