// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VIETNAMSL is ERC20, ERC20Burnable, Ownable {
    struct VestingSchedule {
        uint256 amount; // Số lượng token đã được giao
        uint256 expiry; // Thời gian vesting
        bool claimed; // Trạng thái đã nhận token hay chưa
    }
    uint256 private _maxTxAmount;

    mapping(address => VestingSchedule) public vestingSchedules;

    constructor() ERC20("VIET NAM CEH", "CTH") Ownable(msg.sender) {
        _mint(msg.sender, 3000000 * 10**decimals());
        _maxTxAmount = 10000 * 10**decimals(); // Giới hạn ban đầu cho số tiền tối đa có thể chuyển trong 1 giao dịch
    }

    // Chủ sở hữu có thể mint thêm token
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
      // Hàm cập nhật giá trị _maxTxAmount, chỉ chủ sở hữu có quyền thay đổi
    function setMaxTxAmount(uint256 maxTxAmount) external onlyOwner {
        _maxTxAmount = maxTxAmount;
    }

    // Ghi đè chức năng chuyển để bao gồm kiểm tra maxTxAmount
    function transfer(address recipient, uint256 amount) public override returns (bool) {
        require(amount <= _maxTxAmount, "Transfer amount exceeds the maxTxAmount");

        return super.transfer(recipient, amount);
    }

    // Ghi đè hàm transferFrom để bao gồm kiểm tra maxTxAmount
    function transferFrom(address sender, address recipient, uint256 amount) public override returns (bool) {
        require(amount <= _maxTxAmount, "Transfer amount exceeds the maxTxAmount");

        return super.transferFrom(sender, recipient, amount);
    }

  

    // Hàm lấy giá trị _maxTxAmount hiện tại
    function getMaxTxAmount() external view returns (uint256) {
        return _maxTxAmount;
    }

    // start  (vesting)
    function lock(address receiver, uint256 amount, uint256 expiry) external onlyOwner {
        // Kiểm tra xem đã có đợt vesting nào trước đó và đã kết thúc chưa
        if (vestingSchedules[receiver].amount > 0) {
            require(vestingSchedules[receiver].claimed, "Previous vesting has not been claimed yet.");
        }
        require(expiry > block.timestamp, "Expiry must be in the future");

        // Chuyển token từ chủ sở hữu hợp đồng vào smart contract
        _transfer(msg.sender, address(this), amount);

        // Tạo lịch vesting mới cho người nhận
        vestingSchedules[receiver] = VestingSchedule({
            amount: amount,
            expiry: expiry,
            claimed: false
        });
    }
    // Hàm để rút token sau khi hết thời gian vesting
    function withdraw() external {
        VestingSchedule storage schedule = vestingSchedules[msg.sender];
        require(schedule.amount > 0, "No tokens locked");
        require(block.timestamp > schedule.expiry, "Vesting period not over yet");
        require(!schedule.claimed, "Tokens already claimed");
        // Đánh dấu là đã nhận token
        schedule.claimed = true;
        // Chuyển token cho người nhận
        _transfer(address(this), msg.sender, schedule.amount);
    }
    // Hàm để lấy thời gian hiện tại (hỗ trợ kiểm tra vesting)
    function getTime() external view returns (uint256) {
        return block.timestamp;
    }
    // end (vesting)
}
